#!/usr/bin/env python3
"""
AI-Powered Figma to Elementor Converter
This script uses AI models to analyze Figma designs and generate Elementor-compatible structure
"""

import json
import requests
import base64
import os
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
from io import BytesIO
from PIL import Image

@dataclass
class FigmaElement:
    id: str
    name: str
    type: str
    position: Dict[str, float]
    size: Dict[str, float]
    styles: Dict[str, Any]
    children: List['FigmaElement'] = None

class AIFigmaConverter:
    def __init__(self, figma_token: str, openai_api_key: str = None):
        self.figma_token = figma_token
        self.openai_api_key = openai_api_key
        self.figma_api_base = "https://api.figma.com/v1"
        
    def fetch_figma_file(self, file_id: str) -> Dict[str, Any]:
        """Fetch Figma file data using the API"""
        headers = {"X-Figma-Token": self.figma_token}
        response = requests.get(f"{self.figma_api_base}/files/{file_id}", headers=headers)
        
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Failed to fetch Figma file: {response.status_code}")
    
    def export_figma_images(self, file_id: str, node_ids: List[str], format: str = "png") -> Dict[str, str]:
        """Export images from Figma nodes"""
        headers = {"X-Figma-Token": self.figma_token}
        params = {
            "ids": ",".join(node_ids),
            "format": format,
            "scale": 2
        }
        
        response = requests.get(f"{self.figma_api_base}/images/{file_id}", headers=headers, params=params)
        
        if response.status_code == 200:
            return response.json()["images"]
        else:
            raise Exception(f"Failed to export images: {response.status_code}")
    
    def analyze_design_with_ai(self, figma_data: Dict[str, Any], image_url: str = None) -> Dict[str, Any]:
        """Use AI to analyze the design and suggest Elementor structure"""
        
        # Extract design information
        design_info = self.extract_design_info(figma_data)
        
        # Create AI prompt
        prompt = self.create_ai_prompt(design_info, image_url)
        
        # Call AI API (example with OpenAI)
        if self.openai_api_key:
            return self.call_openai_api(prompt, image_url)
        else:
            # Return structured analysis without AI API
            return self.create_manual_analysis(design_info)
    
    def extract_design_info(self, figma_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract key design information from Figma data"""
        info = {
            "layout_structure": [],
            "color_palette": set(),
            "typography": set(),
            "components": [],
            "spacing": set()
        }
        
        def traverse_node(node: Dict[str, Any], depth: int = 0):
            # Extract layout structure
            if node.get("type") == "FRAME" and depth <= 2:
                frame_info = {
                    "name": node.get("name", ""),
                    "type": node.get("type"),
                    "width": node.get("absoluteBoundingBox", {}).get("width", 0),
                    "height": node.get("absoluteBoundingBox", {}).get("height", 0),
                    "children_count": len(node.get("children", [])),
                    "layout": node.get("layoutMode", "NONE")
                }
                info["layout_structure"].append(frame_info)
            
            # Extract colors
            if "fills" in node:
                for fill in node["fills"]:
                    if fill.get("type") == "SOLID" and "color" in fill:
                        color = fill["color"]
                        hex_color = self.rgba_to_hex(color["r"], color["g"], color["b"], color.get("a", 1))
                        info["color_palette"].add(hex_color)
            
            # Extract typography
            if node.get("type") == "TEXT" and "style" in node:
                style = node["style"]
                font_info = f"{style.get('fontFamily', 'Arial')}-{style.get('fontSize', 16)}px-{style.get('fontWeight', 400)}"
                info["typography"].add(font_info)
            
            # Extract spacing
            for prop in ["paddingLeft", "paddingTop", "paddingRight", "paddingBottom"]:
                if prop in node:
                    info["spacing"].add(node[prop])
            
            # Process children
            if "children" in node:
                for child in node["children"]:
                    traverse_node(child, depth + 1)
        
        # Process all pages
        for page in figma_data.get("document", {}).get("children", []):
            traverse_node(page)
        
        # Convert sets to lists for JSON serialization
        info["color_palette"] = list(info["color_palette"])
        info["typography"] = list(info["typography"])
        info["spacing"] = list(info["spacing"])
        
        return info
    
    def create_ai_prompt(self, design_info: Dict[str, Any], image_url: str = None) -> str:
        """Create a comprehensive AI prompt for Figma to Elementor conversion"""
        
        prompt = f"""
Convert this Figma design to a complete Elementor page structure. Analyze the design and create:

DESIGN ANALYSIS:
- Layout Structure: {len(design_info['layout_structure'])} main frames/sections
- Color Palette: {', '.join(design_info['color_palette'][:10])}
- Typography: {', '.join(design_info['typography'][:5])}
- Spacing Values: {', '.join(map(str, design_info['spacing'][:10]))}px

REQUIREMENTS:
1. Create a responsive Elementor page structure with sections, columns, and widgets
2. Use appropriate Elementor widgets (heading, text, button, image, spacer, etc.)
3. Generate custom CSS for precise styling
4. Include mobile and tablet responsive settings
5. Optimize for performance and accessibility

OUTPUT FORMAT (JSON):
{{
  "elementor_structure": {{
    "sections": [
      {{
        "id": "section_1",
        "type": "section",
        "settings": {{
          "layout": "boxed",
          "gap": "default",
          "height": "default",
          "background_color": "#ffffff",
          "padding": {{"top": 60, "right": 20, "bottom": 60, "left": 20}}
        }},
        "columns": [
          {{
            "id": "column_1",
            "width": 100,
            "widgets": [
              {{
                "type": "heading",
                "settings": {{
                  "title": "Main Heading",
                  "size": "h1",
                  "color": "#333333",
                  "typography_font_family": "Arial",
                  "typography_font_size": {{"unit": "px", "size": 48}},
                  "typography_font_weight": "700"
                }}
              }}
            ]
          }}
        ]
      }}
    ]
  }},
  "custom_css": "/* Custom CSS for precise styling */",
  "responsive_settings": {{
    "mobile": {{}},
    "tablet": {{}}
  }},
  "global_styles": {{
    "colors": {design_info['color_palette']},
    "fonts": {design_info['typography']}
  }}
}}

Create a complete, production-ready Elementor structure that faithfully recreates the Figma design.
"""
        
        return prompt.strip()
    
    def call_openai_api(self, prompt: str, image_url: str = None) -> Dict[str, Any]:
        """Call OpenAI API for AI-powered analysis"""
        headers = {
            "Authorization": f"Bearer {self.openai_api_key}",
            "Content-Type": "application/json"
        }
        
        messages = [
            {
                "role": "system",
                "content": "You are an expert web developer specializing in converting designs to Elementor. Provide precise, production-ready code and structure."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
        
        # Add image if provided
        if image_url:
            messages[-1]["content"] = [
                {"type": "text", "text": prompt},
                {"type": "image_url", "image_url": {"url": image_url}}
            ]
        
        data = {
            "model": "gpt-4-vision-preview" if image_url else "gpt-4",
            "messages": messages,
            "max_tokens": 4000,
            "temperature": 0.3
        }
        
        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=data)
        
        if response.status_code == 200:
            result = response.json()
            content = result["choices"][0]["message"]["content"]
            
            # Try to extract JSON from the response
            try:
                # Find JSON in the response
                start = content.find('{')
                end = content.rfind('}') + 1
                json_str = content[start:end]
                return json.loads(json_str)
            except:
                return {"error": "Failed to parse AI response", "raw_response": content}
        else:
            raise Exception(f"OpenAI API error: {response.status_code}")
    
    def create_manual_analysis(self, design_info: Dict[str, Any]) -> Dict[str, Any]:
        """Create manual analysis when AI API is not available"""
        
        # Generate basic Elementor structure based on design info
        sections = []
        
        for i, frame in enumerate(design_info["layout_structure"]):
            section = {
                "id": f"section_{i+1}",
                "type": "section",
                "settings": {
                    "layout": "boxed",
                    "gap": "default",
                    "height": "default",
                    "background_color": design_info["color_palette"][0] if design_info["color_palette"] else "#ffffff",
                    "padding": {"top": 60, "right": 20, "bottom": 60, "left": 20}
                },
                "columns": [
                    {
                        "id": f"column_{i+1}_1",
                        "width": 100,
                        "widgets": [
                            {
                                "type": "heading",
                                "settings": {
                                    "title": frame["name"] or f"Section {i+1} Heading",
                                    "size": "h2",
                                    "color": "#333333"
                                }
                            }
                        ]
                    }
                ]
            }
            sections.append(section)
        
        return {
            "elementor_structure": {"sections": sections},
            "custom_css": "/* Add custom CSS here */",
            "design_tokens": design_info,
            "responsive_settings": {"mobile": {}, "tablet": {}},
            "global_styles": {
                "colors": design_info["color_palette"],
                "fonts": design_info["typography"]
            }
        }
    
    def generate_elementor_json(self, figma_file_id: str, output_file: str = None) -> Dict[str, Any]:
        """Complete conversion process from Figma to Elementor JSON"""
        
        print("Fetching Figma file...")
        figma_data = self.fetch_figma_file(figma_file_id)
        
        print("Analyzing design with AI...")
        ai_analysis = self.analyze_design_with_ai(figma_data)
        
        print("Generating Elementor structure...")
        elementor_data = {
            "version": "3.0.0",
            "title": figma_data.get("name", "Converted Page"),
            "type": "page",
            "content": ai_analysis.get("elementor_structure", {}),
            "page_settings": {
                "custom_css": ai_analysis.get("custom_css", ""),
                "responsive_settings": ai_analysis.get("responsive_settings", {})
            },
            "meta": {
                "converted_from": "figma",
                "figma_file_id": figma_file_id,
                "conversion_timestamp": self.get_timestamp()
            }
        }
        
        if output_file:
            with open(output_file, 'w') as f:
                json.dump(elementor_data, f, indent=2)
            print(f"Elementor JSON saved to: {output_file}")
        
        return elementor_data
    
    def generate_implementation_guide(self, elementor_data: Dict[str, Any]) -> str:
        """Generate step-by-step implementation guide"""
        
        guide = f"""
# Elementor Implementation Guide

## Overview
This guide will help you implement the converted Figma design in Elementor.

## Step 1: Prepare Your WordPress Site
1. Install and activate Elementor Pro
2. Create a new page or edit existing one
3. Choose "Edit with Elementor"

## Step 2: Import Structure
1. Use the generated JSON structure below
2. Create sections manually following the structure
3. Add widgets as specified

## Step 3: Apply Custom Styles
Add this CSS to Elementor > Custom CSS:

```css
{elementor_data.get('page_settings', {}).get('custom_css', '/* No custom CSS generated */')}
```

## Step 4: Configure Responsive Settings
- Test on mobile and tablet
- Adjust spacing and typography as needed
- Use Elementor's responsive controls

## Generated Structure Summary:
- Sections: {len(elementor_data.get('content', {}).get('sections', []))}
- Total Widgets: {self.count_widgets(elementor_data)}

## Implementation Tips:
1. Start with desktop layout first
2. Test mobile responsiveness frequently
3. Optimize images for web
4. Use Elementor's global styles for consistency

"""
        return guide
    
    def count_widgets(self, elementor_data: Dict[str, Any]) -> int:
        """Count total widgets in the structure"""
        count = 0
        sections = elementor_data.get('content', {}).get('sections', [])
        for section in sections:
            for column in section.get('columns', []):
                count += len(column.get('widgets', []))
        return count
    
    def rgba_to_hex(self, r: float, g: float, b: float, a: float = 1.0) -> str:
        """Convert RGBA to hex color"""
        r, g, b = int(r * 255), int(g * 255), int(b * 255)
        if a < 1.0:
            a = int(a * 255)
            return f"#{r:02x}{g:02x}{b:02x}{a:02x}"
        return f"#{r:02x}{g:02x}{b:02x}"
    
    def get_timestamp(self) -> str:
        """Get current timestamp"""
        from datetime import datetime
        return datetime.now().isoformat()

def main():
    """Example usage"""
    # Configuration
    FIGMA_TOKEN = os.getenv('FIGMA_TOKEN', 'your_figma_token_here')
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', None)  # Optional
    FIGMA_FILE_ID = "your_figma_file_id_here"
    
    # Initialize converter
    converter = AIFigmaConverter(FIGMA_TOKEN, OPENAI_API_KEY)
    
    try:
        # Convert Figma to Elementor
        elementor_data = converter.generate_elementor_json(FIGMA_FILE_ID, "elementor_output.json")
        
        # Generate implementation guide
        guide = converter.generate_implementation_guide(elementor_data)
        
        with open("implementation_guide.md", "w") as f:
            f.write(guide)
        
        print("✅ Conversion completed successfully!")
        print("📁 Files generated:")
        print("   - elementor_output.json (Elementor structure)")
        print("   - implementation_guide.md (Step-by-step guide)")
        
    except Exception as e:
        print(f"❌ Error during conversion: {str(e)}")

if __name__ == "__main__":
    main()
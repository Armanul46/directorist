/**
 * Figma to Elementor AI Helper Script
 * This script helps extract design data from Figma and converts it to Elementor-compatible structure
 */

class FigmaToElementorConverter {
    constructor(figmaToken) {
        this.figmaToken = figmaToken;
        this.apiBase = 'https://api.figma.com/v1';
    }

    /**
     * Fetch Figma file data
     */
    async fetchFigmaFile(fileId) {
        try {
            const response = await fetch(`${this.apiBase}/files/${fileId}`, {
                headers: {
                    'X-Figma-Token': this.figmaToken
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching Figma file:', error);
            throw error;
        }
    }

    /**
     * Extract design tokens from Figma file
     */
    extractDesignTokens(figmaData) {
        const tokens = {
            colors: new Set(),
            fonts: new Set(),
            spacing: new Set(),
            breakpoints: {}
        };

        const traverseNode = (node) => {
            // Extract colors
            if (node.fills && Array.isArray(node.fills)) {
                node.fills.forEach(fill => {
                    if (fill.type === 'SOLID' && fill.color) {
                        const { r, g, b, a = 1 } = fill.color;
                        const hex = this.rgbaToHex(r * 255, g * 255, b * 255, a);
                        tokens.colors.add(hex);
                    }
                });
            }

            // Extract typography
            if (node.style && node.style.fontFamily) {
                tokens.fonts.add({
                    family: node.style.fontFamily,
                    size: node.style.fontSize,
                    weight: node.style.fontWeight,
                    lineHeight: node.style.lineHeightPx
                });
            }

            // Extract spacing
            if (node.paddingLeft !== undefined) {
                tokens.spacing.add(node.paddingLeft);
            }
            if (node.paddingTop !== undefined) {
                tokens.spacing.add(node.paddingTop);
            }

            // Recursively traverse children
            if (node.children) {
                node.children.forEach(child => traverseNode(child));
            }
        };

        figmaData.document.children.forEach(page => {
            page.children.forEach(frame => {
                traverseNode(frame);
            });
        });

        return {
            colors: Array.from(tokens.colors),
            fonts: Array.from(tokens.fonts),
            spacing: Array.from(tokens.spacing),
            breakpoints: tokens.breakpoints
        };
    }

    /**
     * Convert Figma structure to Elementor sections
     */
    convertToElementorStructure(figmaData) {
        const elementorStructure = {
            sections: [],
            globalStyles: {},
            customCSS: ''
        };

        const processFrame = (frame) => {
            const section = {
                id: this.generateId(),
                type: 'section',
                settings: {
                    gap: 'default',
                    padding: this.extractPadding(frame),
                    background_color: this.extractBackgroundColor(frame)
                },
                columns: []
            };

            // Process children as columns or widgets
            if (frame.children) {
                const columns = this.groupIntoColumns(frame.children);
                section.columns = columns.map(columnData => this.processColumn(columnData));
            }

            return section;
        };

        // Process main frames as sections
        figmaData.document.children.forEach(page => {
            page.children.forEach(frame => {
                if (frame.type === 'FRAME') {
                    const section = processFrame(frame);
                    elementorStructure.sections.push(section);
                }
            });
        });

        return elementorStructure;
    }

    /**
     * Group child elements into logical columns
     */
    groupIntoColumns(children) {
        // Simple algorithm: group by X position
        const columns = [];
        const sorted = children.sort((a, b) => a.absoluteBoundingBox.x - b.absoluteBoundingBox.x);
        
        let currentColumn = [];
        let lastX = -1;
        
        sorted.forEach(child => {
            const currentX = Math.floor(child.absoluteBoundingBox.x / 50) * 50; // Group within 50px
            
            if (lastX !== -1 && Math.abs(currentX - lastX) > 100) {
                if (currentColumn.length > 0) {
                    columns.push(currentColumn);
                    currentColumn = [];
                }
            }
            
            currentColumn.push(child);
            lastX = currentX;
        });
        
        if (currentColumn.length > 0) {
            columns.push(currentColumn);
        }
        
        return columns;
    }

    /**
     * Process column data
     */
    processColumn(columnData) {
        const column = {
            id: this.generateId(),
            type: 'column',
            settings: {
                _column_size: Math.floor(100 / columnData.length),
                _inline_size: null
            },
            widgets: []
        };

        columnData.forEach(element => {
            const widget = this.convertToWidget(element);
            if (widget) {
                column.widgets.push(widget);
            }
        });

        return column;
    }

    /**
     * Convert Figma element to Elementor widget
     */
    convertToWidget(element) {
        switch (element.type) {
            case 'TEXT':
                return this.createTextWidget(element);
            case 'RECTANGLE':
            case 'FRAME':
                return this.createContainerWidget(element);
            case 'INSTANCE':
                return this.createCustomWidget(element);
            default:
                return this.createHtmlWidget(element);
        }
    }

    /**
     * Create text widget
     */
    createTextWidget(element) {
        return {
            id: this.generateId(),
            type: 'heading',
            settings: {
                title: element.characters || 'Heading Text',
                size: this.getFontSize(element),
                color: this.getTextColor(element),
                typography_font_family: this.getFontFamily(element),
                typography_font_weight: this.getFontWeight(element)
            }
        };
    }

    /**
     * Create container widget
     */
    createContainerWidget(element) {
        return {
            id: this.generateId(),
            type: 'container',
            settings: {
                background_color: this.extractBackgroundColor(element),
                border_radius: this.getBorderRadius(element),
                padding: this.extractPadding(element),
                margin: this.extractMargin(element)
            }
        };
    }

    /**
     * Create HTML widget for complex elements
     */
    createHtmlWidget(element) {
        const html = this.generateHTMLFromElement(element);
        const css = this.generateCSSFromElement(element);
        
        return {
            id: this.generateId(),
            type: 'html',
            settings: {
                html: html,
                custom_css: css
            }
        };
    }

    /**
     * Generate AI-compatible prompt for complex conversions
     */
    generateAIPrompt(figmaData, targetElement = null) {
        const tokens = this.extractDesignTokens(figmaData);
        
        const prompt = `
Convert this Figma design to Elementor structure:

Design Tokens:
- Colors: ${tokens.colors.join(', ')}
- Fonts: ${tokens.fonts.map(f => f.family).join(', ')}
- Spacing: ${tokens.spacing.join('px, ')}px

Requirements:
1. Create responsive Elementor sections and columns
2. Use appropriate widgets (heading, text, button, image, etc.)
3. Apply custom CSS for exact styling
4. Ensure mobile responsiveness
5. Optimize for performance

${targetElement ? `Focus on element: ${targetElement.name}` : 'Convert entire design'}

Generate:
1. Elementor JSON structure
2. Custom CSS
3. Responsive breakpoint settings
4. Widget configuration
        `;

        return prompt.trim();
    }

    /**
     * Helper methods
     */
    generateId() {
        return 'el_' + Math.random().toString(36).substr(2, 9);
    }

    rgbaToHex(r, g, b, a) {
        const toHex = (n) => {
            const hex = Math.round(n).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        
        const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        return a < 1 ? hex + toHex(a * 255) : hex;
    }

    extractBackgroundColor(element) {
        if (element.fills && element.fills[0] && element.fills[0].type === 'SOLID') {
            const { r, g, b, a = 1 } = element.fills[0].color;
            return this.rgbaToHex(r * 255, g * 255, b * 255, a);
        }
        return '';
    }

    extractPadding(element) {
        return {
            top: element.paddingTop || 0,
            right: element.paddingRight || 0,
            bottom: element.paddingBottom || 0,
            left: element.paddingLeft || 0
        };
    }

    extractMargin(element) {
        return {
            top: element.marginTop || 0,
            right: element.marginRight || 0,
            bottom: element.marginBottom || 0,
            left: element.marginLeft || 0
        };
    }

    getFontSize(element) {
        return element.style && element.style.fontSize ? `${element.style.fontSize}px` : '16px';
    }

    getFontFamily(element) {
        return element.style && element.style.fontFamily ? element.style.fontFamily : 'Arial';
    }

    getFontWeight(element) {
        return element.style && element.style.fontWeight ? element.style.fontWeight : '400';
    }

    getTextColor(element) {
        if (element.fills && element.fills[0] && element.fills[0].type === 'SOLID') {
            const { r, g, b, a = 1 } = element.fills[0].color;
            return this.rgbaToHex(r * 255, g * 255, b * 255, a);
        }
        return '#000000';
    }

    getBorderRadius(element) {
        if (element.cornerRadius !== undefined) {
            return {
                top: element.cornerRadius,
                right: element.cornerRadius,
                bottom: element.cornerRadius,
                left: element.cornerRadius
            };
        }
        return { top: 0, right: 0, bottom: 0, left: 0 };
    }

    /**
     * Generate HTML for complex elements
     */
    generateHTMLFromElement(element) {
        return `<div class="figma-element figma-${element.type.toLowerCase()}" data-figma-id="${element.id}">
    <!-- Generated from Figma element: ${element.name || element.type} -->
    ${element.characters || ''}
</div>`;
    }

    /**
     * Generate CSS for complex elements
     */
    generateCSSFromElement(element) {
        const styles = [];
        
        if (element.absoluteBoundingBox) {
            styles.push(`width: ${element.absoluteBoundingBox.width}px;`);
            styles.push(`height: ${element.absoluteBoundingBox.height}px;`);
        }
        
        const bgColor = this.extractBackgroundColor(element);
        if (bgColor) {
            styles.push(`background-color: ${bgColor};`);
        }
        
        if (element.cornerRadius) {
            styles.push(`border-radius: ${element.cornerRadius}px;`);
        }
        
        return `.figma-element { ${styles.join(' ')} }`;
    }
}

// Usage example
const converter = new FigmaToElementorConverter('YOUR_FIGMA_TOKEN');

// Export for use in different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FigmaToElementorConverter;
} else if (typeof window !== 'undefined') {
    window.FigmaToElementorConverter = FigmaToElementorConverter;
}
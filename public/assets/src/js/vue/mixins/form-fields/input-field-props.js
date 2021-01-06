export default {
    props: {
        fieldId: {
            type: [String, Number],
            required: false,
            default: '',
        },
        type: {
            type: String,
            required: false,
            default: '',
        },
        label: {
            type: [String, Number],
            required: false,
            default: '',
        },
        buttonLabel: {
            type: String,
            required: false,
            default: '',
        },
        buttonLabelOnProcessing: {
            type: String,
            required: false,
            default: '',
        },
        action: {
            type: String,
            required: false,
            default: '',
        },
        description: {
            type: [ String ],
            required: false,
            default: '',
        },
        id: {
            type: [String, Number],
            required: false,
            default: '',
        },
        name: {
            type: [String, Number],
            required: false,
            default: '',
        },
        value: {
            // type: [String, Number],
            default: '',
        },
        options: {
            required: false,
        },
        optionsSource: {
            required: false,
        },
        showDefaultOption: {
            type: Boolean,
            default: false,
        },
        defaultOption: {
            type: Object,
            required: false,
        },
        placeholder: {
            type: [String, Number],
            required: false,
            default: '',
        },
        infoTextForNoOption: {
            type: String,
            required: false,
            default: 'Nothing available',
        },
        cols: {
            type: [String, Number],
            required: false,
            default: '30',
        },
        rows: {
            type: [String, Number],
            required: false,
            default: '10',
        },
        defaultImg: {
            required: false,
        },
        selectButtonLabel: {
            required: false,
            type: String,
            default: 'Select',
        },
        changeButtonLabel: {
            required: false,
            type: String,
            default: 'Change',
        },
        rules: {
            required: false,
        },
        validationState: {
            required: false,
        },
        validation: {
            required: false,
        },
    },
}
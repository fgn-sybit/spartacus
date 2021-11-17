export const configurator = {
  configurator: {
    header: {
      consistent: 'Consistent',
      complete: 'Complete',
      configId: 'Configuration ID',
      toconfig: 'Configure',
      editConfiguration: 'Edit Configuration',
      displayConfiguration: 'Display Configuration',
      resolveIssues: 'Resolve Issues',
      updateMessage: 'The configuration is being updated in the background',
      showMore: 'show more',
      showLess: 'show less',
      items: '{{count}} item',
      items_plural: '{{count}} items',
      show: 'show',
      hide: 'hide',
      multipleWarnings: 'There are multiple warnings.',
      reviewWarnings: 'Review these warnings',
      multipleErrors: 'There are multiple errors.',
      reviewErrors: 'Review these errors',
    },
    tabBar: {
      configuration: 'Configuration',
      overview: 'Overview',
    },
    notificationBanner: {
      numberOfIssues: '{{count}} issue must be resolved before checkout.',
      numberOfIssues_plural:
        '{{count}} issues must be resolved before checkout.',
    },
    attribute: {
      id: 'ID',
      quantity: 'Qty',
      caption: 'Attributes',
      notSupported: 'Attribute Type is not supported.',
      requiredAttribute: '{{param}} required',
      defaultRequiredMessage: 'Enter a value for the required field',
      singleSelectRequiredMessage: 'Select a value',
      multiSelectRequiredMessage: 'Select one or more values',
      wrongNumericFormat:
        'Wrong format, this numerical attribute should be entered according to pattern {{pattern}}',
      deselectionNotPossible:
        'Add a different product before removing this one',
      dropDownSelectMsg: 'Make a selection',
      noOptionSelectedMsg: 'No option selected',
    },
    button: {
      previous: 'Previous',
      next: 'Next',
      back: 'Back',
      more: 'more',
      less: 'less',
      deselect: 'Deselect',
      select: 'Select',
      add: 'Add',
      remove: 'Remove',
      exit: 'Exit Configuration',
      exitMobile: 'Exit',
    },
    priceSummary: {
      basePrice: 'Base Price',
      selectedOptions: 'Selected Options',
      totalPrice: 'Total',
    },
    addToCart: {
      button: 'Add to Cart',
      buttonAfterAddToCart: 'Continue to Cart',
      buttonUpdateCart: 'Done',
      confirmation: 'Configuration has been added to the cart',
      confirmationUpdate: 'Cart has been updated with configuration',
    },
    overviewForm: {
      noAttributeHeader: 'No Results',
      noAttributeText: 'Remove filter(s) to see Overview content',
      itemPrice: 'Item Price',
    },
    group: {
      general: 'General',
      conflictHeader: 'Resolve conflicts',
      conflictGroup: 'Conflict for {{attribute}}',
    },
    conflict: {
      suggestionTitle: 'Suggestion {{number}}:',
      suggestionText: 'Change value for "{{ attribute }}"',
      viewConflictDetails: 'Conflict Detected',
      viewConfigurationDetails: '',
    },
    a11y: {
      nameOfAttribute: 'Name of Attribute',
      valueOfAttribute: 'Value of attribute {{ attribute }}',
      valueOfAttributeFull: 'Value {{ value }} of attribute {{ attribute }}',
      selectedValueOfAttributeFull: 'Selected value {{ value }} of attribute {{ attribute }}',
      readOnlyValueOfAttributeFull:
        'Read-only value {{ value }} of attribute {{ attribute }}',
      valueOfAttributeBlank: 'Value of attribute {{ attribute }} is blank',
      value: 'Value {{ value }}',
      attribute: 'Attribute {{ attribute }}',
      requiredAttribute: 'Attribute {{param}} is required',
      listOfAttributesAndValues: 'List of attributes and their values:',
      editAttributesAndValues: 'Edit values of attributes:',
      group: '{{ group }} group of attributes',
      itemOfAttributeSelected:
        'Item {{ item }} of attribute {{ attribute }} is selected',
      itemOfAttributeSelectedPressToUnselect:
        'Item {{ item }} of attribute {{ attribute }} is selected. Press button to unselect.',
      itemOfAttributeUnselected:
        'Item {{ item }} of attribute {{ attribute }} is unselected. Press button to select.',
      selectNoItemOfAttribute: 'To select no item for attribute {{ attribute }} press button.',
      itemOfAttribute: 'Item of attribute {{ attribute }}',
      itemDescription: 'Description for item {{ item }}',
      listbox: 'Listbox with {{ count }} values.',
    },
  },
};

Tinytest.add('Meteor Ace Editor - Package Test', function(test) {
    test.isNotNull(ace);
    test.isNotNull(ace.require("ace/ext/language_tools"));
});
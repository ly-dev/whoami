// Describe a feature
describe('Oedema', function () {
    it('should start from Introduction', function () {
        expect(element(by.id('shortText')).getText())
            .toContain('Introduction');
    });

    it('should go to Oedema', function () {
        element(by.id('button-start'))
            .click();

        expect(element(by.id('shortText')).getText())
            .toContain('Oedema');
    });

    it('should go to Summary', function () {
        element(by.id('button-option-1'))
            .click();

        expect(element(by.id('shortText')).getText())
            .toContain('Collected Information');

        expect(element(by.id('summary')).getText())
            .toContain('Found oedema of both feet');
    });

    it('should go to Diagnose', function () {
        element(by.id('button-diagnose'))
            .click();

        expect(element(by.id('shortText')).getText())
            .toContain('Nutritional Status');

        expect(element(by.id('conclusion')).getText())
            .toContain('COMPLICATED SEVERE ACUTE MALNUTRITION');
    });

    it('should go to Oedema, again', function () {
        element(by.id('button-next-child'))
            .click();

        expect(element(by.id('shortText')).getText())
            .toContain('Oedema');
    });

});

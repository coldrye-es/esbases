// TBD:FILEHEADER

import assert from 'esaver';

import EsNumber from '../src/number';


describe('EsNumber',
function ()
{
    it('Number must be its prototype',
    function ()
    {
        assert.ok(Number.isPrototypeOf(EsNumber));
    });

    it('instances must be instances of Number',
    function ()
    {
        assert.ok(new EsNumber() instanceof Number);
    });

    const origParseFloat = parseFloat;
    const origParseInt = parseInt;

    it('.install() must replace global parseInt and parseFloat',
    function ()
    {
        EsNumber.install();
        assert.ok(origParseInt !== parseInt);
        assert.ok(origParseFloat !== parseFloat);
        EsNumber.uninstall();
    });

    it('.uninstall() must restore the original parseInt and parseFloat',
    function ()
    {
        EsNumber.install();
        EsNumber.uninstall();
        assert.ok(origParseInt === parseInt);
        assert.ok(origParseFloat === parseFloat);
    });

    describe('.isNaN()',
    function ()
    {
        it('must return true on EsNumber(Number.NaN)',
        function ()
        {
            assert.ok(EsNumber.isNaN(Number.NaN));
        });

        it('must return true on EsNumber(new EsNumber(Number.NaN))',
        function ()
        {
            assert.ok(EsNumber.isNaN(new EsNumber(Number.NaN)));
        });

        it('must return true on assorted NaNs',
        function ()
        {
            assert.ok(EsNumber.isNaN(undefined));
            assert.ok(EsNumber.isNaN('a'));
        });
    });

    describe('.isFinite()',
    function ()
    {
        it('must return false on EsNumber(Number.NEGATIVE_INFINITY)',
        function ()
        {
            assert.ok(!EsNumber.isFinite(
                new EsNumber(Number.NEGATIVE_INFINITY)
            ));
        });

        it('must return false on Number.POSITIVE_INFINITY',
        function ()
        {
            assert.ok(!EsNumber.isFinite(Number.POSITIVE_INFINITY));
        });

        it('must return false on EsNumber(Number.POSITIVE_INFINITY)',
        function ()
        {
            assert.ok(!EsNumber.isFinite(
                new EsNumber(Number.POSITIVE_INFINITY)
            ));
        });
    });

    describe('.parseFloat()',
    function ()
    {
        it('must return instance of EsNumber',
        function ()
        {
            const actual = EsNumber.parseFloat('0.005');
            assert.ok(actual instanceof EsNumber);
        });
    });

    describe('.parseInt()',
    function ()
    {
        it('must return instance of EsNumber',
        function ()
        {
            const actual = EsNumber.parseInt('5');
            assert.ok(actual instanceof EsNumber);
        });
    });

    describe('constructor',
    function ()
    {
        it('must accept string value',
        function ()
        {
            assert.deepEqual(new EsNumber('1'), new EsNumber(1));
        });

        it('must accept Number value',
        function ()
        {
            assert.deepEqual(new EsNumber(new Number(1)), new EsNumber(1));
        });

        it('must accept EsNumber value',
        function ()
        {
            assert.deepEqual(new EsNumber(new EsNumber(1)), new EsNumber(1));
        });
    });

    describe('#valueOf()',
    function ()
    {
        it('must not throw not generic error',
        function ()
        {
            assert.doesNotThrow(
            function ()
            {
                new EsNumber(1).valueOf();
            });
        });

        it('must return expected value',
        function ()
        {
            assert.equal(new EsNumber(1).valueOf(), 1);
        });
    });

    it('#toString() must return expected value',
    function ()
    {
        assert.equal(new EsNumber(5).toString(), '5');
    });

    it('#toLocaleString() must return expected value',
    function ()
    {
        assert.equal(
            '1000',
            new EsNumber(1000).toLocaleString('en-US', {useGrouping:false})
        );
    });

    it('#toFixed() must return expected value',
    function ()
    {
        assert.equal('1.00', new EsNumber(1).toFixed(2));
    });

    it('#toExponential() must return expected value',
    function ()
    {
        assert.equal('1.00e+0', new EsNumber(1).toExponential(2));
    });

    it('#toPrecision() must return expected value',
    function ()
    {
        assert.equal('1.000', new EsNumber(1).toPrecision(4));
    });
});

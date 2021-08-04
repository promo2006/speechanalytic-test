let common = require("../../../common");
let chai = common.chai;
let should = common.should;
let values = common.values;
let serverSrcPath = common.serverSrcPath;

let arraysShared = require(`${serverSrcPath}/shared/arrays.shared`);

var simpleArray = ['d', 'b', 'a', 'c', 'e', 'a'];
var oldObjectArray = [
    {customId: 1, customValue: 'a'}, 
    {customId: 2, customValue: 'b'},
    {customId: 3, customValue: 'c'},
    {customId: 4, customValue: 'd'},
    {customId: 1, customValue: 'a'}
];
var newObjectArray = [
    {customId: 1, customValue: 'x'}, 
    {customId: 2, customValue: 'b'},
    {customId: 5, customValue: 'c'},
    {customId: 6, customValue: 'd'},
    {customId: 7, customValue: 'z'}
];

// 
describe('GetCompareItemsFromObjectArray', () => {
    it('Comparing by customId property', () => {
        var result = arraysShared.GetCompareItemsFromObjectArray(oldObjectArray, newObjectArray, 'customId');
        result.new.should.to.have.lengthOf(3, 'Should be 3 new items');
        result.old.should.to.have.lengthOf(3, 'Should be 3 old items');
        result.removed.should.to.have.lengthOf(2, 'Should be 2 removed items');
    });

    it('Comparing by customValue property', () => {
        var result = arraysShared.GetCompareItemsFromObjectArray(oldObjectArray, newObjectArray, 'customValue');
        result.new.should.to.have.lengthOf(2, 'Should be 1 new items');
        result.old.should.to.have.lengthOf(3, 'Should be 3 old items');
        result.removed.should.to.have.lengthOf(2, 'Should be 2 removed items');
    });
});

//
describe('GetUniqueFromArray', () => {
    it('GetUniqueFromArray', () => {
        var result = arraysShared.GetUniqueFromArray(simpleArray);
        result.should.to.have.lengthOf(5, 'Should be 5 unique items');
    });
});

//
describe('GetUniqueFromObjectArray', () => {
    it('Getting unique items by customId property', () => {
        var result = arraysShared.GetUniqueFromObjectArray(oldObjectArray, 'customId');
        result.should.to.have.lengthOf(4, 'Should be 4 unique items');
    });

    it('Getting unique items by customValue property', () => {
        var result = arraysShared.GetUniqueFromObjectArray(oldObjectArray, 'customValue');
        result.should.to.have.lengthOf(4, 'Should be 4 unique items');
    });
});

//
describe('SortObjectArrayByValue', () => {
    it('Ascending order by customId property', () => {
        var result = arraysShared.SortObjectArrayByValue(oldObjectArray, 'customId', 'A');
        result[0].customId.should.equal(1, 'Should be "1"');
    });

    it('Ascending order by customValue property', () => {
        var result = arraysShared.SortObjectArrayByValue(oldObjectArray, 'customValue', 'A');
        result[0].customValue.should.equal('a', 'Should be "a"');
    });

    it('Descending order by customId property', () => {
        var result = arraysShared.SortObjectArrayByValue(oldObjectArray, 'customId', 'D');
        result[0].customId.should.equal(4, 'Should be "4"');
    });

    it('Descending order by customValue property', () => {
        var result = arraysShared.SortObjectArrayByValue(oldObjectArray, 'customValue', 'D');
        result[0].customValue.should.equal('d', 'Should be "d"');
    });
});

//
describe('SortObjectArrayByShuffle', () => {
    it('Descending order by customValue property', () => {
        var result = arraysShared.SortObjectArrayByShuffle(JSON.parse(JSON.stringify(oldObjectArray)));
        JSON.stringify(result).should.not.equal(JSON.stringify(oldObjectArray), 'Should be different');
    });
});

import { generateUUID } from './uuid';

describe('uuid', () => {
    it('should generate a unique id', () => {
        const id1 = generateUUID();
        const id2 = generateUUID();
        expect(id1).not.toEqual(id2);
    });
});

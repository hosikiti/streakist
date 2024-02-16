import { generateUUID } from './uuid';

describe('uuid', () => {
    test('should generate a unique id', () => {
        const uuids: string[] = [];

        for (let i = 0; i < 10000; i++) {
            uuids.push(generateUUID());
        }

        const uniqueUuids = new Set(uuids);
        expect(uniqueUuids.size).toBe(uuids.length);
    });
});

import mockAPI from './mockAuthorApi';
import realAPI from './fireBaseAuthorApi';

const shouldUseMock = process.env.NODE_ENV === 'test';
const exportedAPI = shouldUseMock ? mockAPI : realAPI;

export default exportedAPI;

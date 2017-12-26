import mockAPI from './mockAccountApi';
import realAPI from './fireBaseAccountApi';

const shouldUseMock = process.env.NODE_ENV === 'test';
const exportedAPI = shouldUseMock ? mockAPI : realAPI;

export default exportedAPI;

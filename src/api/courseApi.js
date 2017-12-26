import mockAPI from './mockCourseApi';
import realAPI from './fireBaseCourseApi';

const shouldUseMock = process.env.NODE_ENV === 'test';
const exportedAPI = shouldUseMock ? mockAPI : realAPI;

export default exportedAPI;

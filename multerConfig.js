import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES 모듈 환경에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer 디스크 저장소 설정
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const restaurantId = req.params.restaurantId; // URL에서 restaurantId 추출
    const dir = path.join(__dirname, `../uploads/${restaurantId}/foods`);

    // 디렉토리가 없으면 생성
    fs.mkdirSync(dir, { recursive: true });

    callback(null, dir); // 동적 경로 설정
  },
  filename: function (req, file, callback) {
    // 파일 이름 설정
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    callback(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

export { upload };
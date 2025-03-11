import crypto from 'crypto';

// 암호화 키 (32바이트, 256비트)
const encryptionKey = Buffer.from('06686BC429511BA7E962B770FCFA57BB', 'hex'); // 32바이트 (256비트)
// IV (16바이트, 128비트)
const iv = Buffer.from('14c954477a6c9a1d', 'hex'); // 16바이트 (128비트)

// 키와 IV 길이 확인 (디버깅용)
console.log('Key length:', encryptionKey.length);
console.log('IV length:', iv.length);

// PKCS7 패딩 추가
function pkcs7Pad(buffer, blockSize) {
    const padding = blockSize - (buffer.length % blockSize);
    const paddingBuffer = Buffer.alloc(padding, padding);
    return Buffer.concat([buffer, paddingBuffer]);
}

export function encryptContact(contact) {
    // 16바이트 블록 크기 (AES-256-CBC는 128비트 IV 사용)
    const paddedContact = pkcs7Pad(Buffer.from(contact, 'utf8'), 16);

    // 암호화 작업 (AES-256-CBC)
    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
    let encrypted = cipher.update(paddedContact); // 암호화 데이터
    encrypted = Buffer.concat([encrypted, cipher.final()]); // 최종 암호화 결과

    // 암호화된 텍스트를 base64로 반환
    return encrypted.toString('base64');
}

// 테스트
const encryptedContact = encryptContact('01023407529');
console.log('Encrypted Contact:', encryptedContact);

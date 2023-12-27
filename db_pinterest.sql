CREATE TABLE nguoi_dung(
    nguoi_dung_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255),
    mat_khau VARCHAR(255),
    ho_ten VARCHAR(255),
    tuoi INT,
    anh_dai_dien VARCHAR(255)
);

CREATE TABLE hinh_anh(
    hinh_id INT PRIMARY KEY AUTO_INCREMENT,
    ten_hinh VARCHAR(255),
    duong_dan VARCHAR(255),
    mo_ta VARCHAR(255),
    nguoi_dung_id INT,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id)
);

CREATE TABLE binh_luan(
    binh_luan_id INT PRIMARY KEY AUTO_INCREMENT,
    nguoi_dung_id INT,
    hinh_id INT,
    ngay_binh_luan DATE,
    noi_dung VARCHAR(255),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id),
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id)
);

CREATE TABLE luu_anh(
    luu_anh_id INT PRIMARY KEY AUTO_INCREMENT,
    nguoi_dung_id INT,
    hinh_id INT,
    ngay_luu DATETIME DEFAULT NOW(),
    da_luu TINYINT(1) DEFAULT 1,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id),
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id),
    UNIQUE(nguoi_dung_id, hinh_id)
);

INSERT INTO
    nguoi_dung (email, mat_khau, ho_ten, tuoi, anh_dai_dien)
VALUES
    (
        'user1@example.com',
        'pass1',
        'Người dùng 1',
        25,
        'avatar1.jpg'
    ),
    (
        'user2@example.com',
        'pass2',
        'Người dùng 2',
        30,
        'avatar2.jpg'
    ),
    (
        'user3@example.com',
        'pass3',
        'Người dùng 3',
        28,
        'avatar3.jpg'
    ),
    (
        'user4@example.com',
        'pass4',
        'Người dùng 4',
        22,
        'avatar4.jpg'
    ),
    (
        'user5@example.com',
        'pass5',
        'Người dùng 5',
        29,
        'avatar5.jpg'
    ),
    (
        'user6@example.com',
        'pass6',
        'Người dùng 6',
        35,
        'avatar6.jpg'
    ),
    (
        'user7@example.com',
        'pass7',
        'Người dùng 7',
        27,
        'avatar7.jpg'
    ),
    (
        'user8@example.com',
        'pass8',
        'Người dùng 8',
        31,
        'avatar8.jpg'
    ),
    (
        'user9@example.com',
        'pass9',
        'Người dùng 9',
        26,
        'avatar9.jpg'
    ),
    (
        'user10@example.com',
        'pass10',
        'Người dùng 10',
        24,
        'avatar10.jpg'
    );

INSERT INTO
    hinh_anh (ten_hinh, duong_dan, mo_ta, nguoi_dung_id)
VALUES
    (
        'TEST 1',
        'https://i.pinimg.com/236x/23/53/97/235397ce366fc81d4bc23683cea0b5f0.jpg',
        'MOTA1',
        11
    ),
    (
        'TEST 1',
        'https://i.pinimg.com/236x/3d/04/bc/3d04bcc028f6fd21c00d064d0f015f01.jpg',
        'MOTA1',
        11
    ),
    (
        'TEST 1',
        'https://i.pinimg.com/236x/e4/a9/ad/e4a9ad720d3d4b9f99a0964504c8cdf6.jpg',
        'MOTA1',
        11
    ),
    (
        'TEST 1',
        'https://i.pinimg.com/236x/57/43/12/57431238589a5ed4154e4e03a45d473b.jpg',
        'MOTA1',
        11
    ),
    (
        'TEST 1',
        'https://i.pinimg.com/236x/d6/a3/83/d6a3837f182fb7cc653744554ff91d0f.jpg',
        'MOTA1',
        11
    ),
    (
        'TEST 1',
        'https://i.pinimg.com/236x/cb/df/a2/cbdfa272cc81ea666d9c2201dbfb26e1.jpg',
        'MOTA1',
        11
    ),
    (
        'TEST 1',
        'https://i.pinimg.com/236x/a1/37/48/a1374804474931ed3139fce47a17cbb1.jpg',
        'MOTA1',
        11
    ),
    (
        'TEST 1',
        'https://i.pinimg.com/236x/e2/d2/51/e2d251034d2cbf60b48b122588c52887.jpg',
        'MOTA1',
        11
    ),
    (
        'TEST 1',
        'https://i.pinimg.com/236x/40/3c/6e/403c6e5bd46ac212351fd80f63a9849f.jpg',
        'MOTA1',
        11
    ),
    (
        'TEST 1',
        'https://i.pinimg.com/236x/d7/42/f0/d742f00a3770c41a1d3e2c2b3dadd6b3.jpg',
        'MOTA1',
        11
    ),
    (
        'TEST 1',
        'https://i.pinimg.com/236x/ce/7b/91/ce7b915b6f366fdffaf38ad081920e7f.jpg',
        'MOTA1',
        11
    ),
    (
        'TEST 1',
        'https://i.pinimg.com/236x/4b/6c/6c/4b6c6ce93265d2a26e38020c340d9e26.jpg',
        'MOTA1',
        11
    ),
    (
        'TEST 1',
        'https://i.pinimg.com/236x/18/a1/c5/18a1c58f53f2027d00d0a75356d494bd.jpg',
        'MOTA1',
        11
    ),
    (
        'TEST 1',
        'https://i.pinimg.com/236x/35/66/fb/3566fb6a1401703c145e9662bc3a7958.jpg',
        'MOTA1',
        11
    ),
    (
        'TEST 1',
        'https://i.pinimg.com/236x/da/40/a4/da40a407d376f45ddcd3b27fb126da6a.jpg',
        'MOTA1',
        11
    ),
    (
        'TEST 1',
        'https://i.pinimg.com/236x/75/37/94/753794368631e5ac40cce68b035c3c67.jpg',
        'MOTA1',
        11
    ),
    (
        'TEST 1',
        'https://i.pinimg.com/236x/72/69/0f/72690f8d53d6bc2863d9e2ecbf90a287.jpg',
        'MOTA1',
        11
    ),
    (
        'TEST 1',
        'https://i.pinimg.com/236x/33/8f/04/338f0458e9b723355d833bc473a68c6f.jpg',
        'MOTA1',
        11
    ),
    (
        'TEST 1',
        'https://i.pinimg.com/236x/72/a5/0a/72a50a37a962f1171b35d54cebbd3c4b.jpg',
        'MOTA1',
        11
    ),
    (
        'TEST 1',
        'https://i.pinimg.com/236x/f5/e2/bb/f5e2bbf3533d75e0fc55cdd31b3265e6.jpg',
        'MOTA1',
        11
    )
INSERT INTO
    luu_anh (nguoi_dung_id, hinh_id)
VALUES
    (1, 38),
    (2, 38),
    (3, 38),
    (4, 38),
    (5, 53),
    (6, 53),
    (7, 53),
    (8, 53),
    (9, 53),
    (10, 53);

INSERT INTO
    binh_luan (nguoi_dung_id, hinh_id, ngay_binh_luan, noi_dung)
VALUES
    (1, 38, CURDATE(), 'Bình luận 1'),
    (2, 38, CURDATE(), 'Bình luận 2'),
    (3, 38, CURDATE(), 'Bình luận 3'),
    (4, 38, CURDATE(), 'Bình luận 4'),
    (5, 38, CURDATE(), 'Bình luận 5'),
    (6, 53, CURDATE(), 'Bình luận 6'),
    (7, 53, CURDATE(), 'Bình luận 7'),
    (8, 53, CURDATE(), 'Bình luận 8'),
    (9, 53, CURDATE(), 'Bình luận 9'),
    (10, 53, CURDATE(), 'Bình luận 10');
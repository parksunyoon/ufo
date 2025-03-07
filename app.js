const express = require('express');
const path = require('path');
const app = express();

// EJS를 뷰 엔진으로 설정
app.set('view engine', 'ejs');

// 정적 파일 제공
app.use(express.static('public'));

// 프로젝트 데이터
const projects = [
    {
        id: 1,
        title: '리프레시',
        categories: ['ARCHITECTURE', 'COMMERCIAL'],
        year: '2025',
        location: '',
        image: 'refresh.jpg',
        description: '새로운 상업공간',
        details: {
            status: '진행중',
            participation: {
                line1: '대지위치: 여주시',
                line2: '용도: 근린생활시설 (남자 사우나 리모델링)',
                line3: '프로젝트 유형: 리모델링'
            },
            images: ['refresh_1.jpg', 'refresh_2.jpg']
        }
    },
    {
        id: 2,
        title: 'DW사옥',
        categories: ['ARCHITECTURE', 'COMMERCIAL'],
        year: '2024',
        location: '',
        image: 'dw.jpg',
        description: '새로운 오피스 공간',
        details: {
            status: '진행중',
            participation: {
                line1: '참여작 (총괄 PM)',
                line2: '삶것건축사사무소(팀장)'
            },
            images: ['dw.jpg']
        }
    },
    {
        id: 3,
        title: '운중동 단독주택',
        categories: ['ARCHITECTURE', 'RESIDENTIAL'],
        year: '2024',
        location: '',
        image: 'unjung.jpg',
        description: '도시 근교의 새로운 주거',
        details: {
            status: '진행중',
            participation: {
                line1: '참여작 (총괄 PM)',
                line2: '삶것건축사사무소(팀장)'
            },
            images: ['unjung.jpg']
        }
    },
    {
        id: 4,
        title: 'SWB',
        categories: ['ARCHITECTURE', 'COMMERCIAL'],
        year: '2023',
        location: '',
        image: 'swb.jpg',
        description: '도시 속 작은 상업공간',
        details: {
            description: [
                '',
                '대지위치: 서울시 성북구 석관동',
                '용도: 근린생활시설',
                '대지면적: 159㎡',
                '건물규모: 지상4층',
                '건축면적: 87.82㎡',
                '연면적: 317.79㎡'
            ],
            images: ['swb_1.jpg', 'swb_2.jpg', 'swb_3.jpg', 'swb_4.jpg', 'swb_5.jpg']
        }
    },
    {
        id: 5,
        title: '제기동 협소주택',
        categories: ['ARCHITECTURE', 'RESIDENTIAL'],
        year: '2023',
        location: '',
        image: 'jegi.jpg',
        description: '도시 속 작은 집',
        details: {
            description: [
                '',
                '대지위치: 서울시 동대문구 제기동',
                '용도: 단독주택 + 근린생활시설',
                '대지면적: 83㎡',
                '건물규모: 지상4층',
                '건축면적: 43㎡',
                '연면적: 165.87㎡'
            ],
            images: ['jegi_1.jpg', 'jegi_2.jpg', 'jegi_3.jpg', 'jegi_4.jpg']
        }
    },
    {
        id: 6,
        title: '제기동 바캉스',
        categories: ['ARCHITECTURE', 'RESIDENTIAL'],
        year: '2023',
        location: '',
        image: 'jegi_vacation.jpg',
        description: '도시 속 휴가',
        details: {
            description: [
                '',
                '대지위치: 서울시 동대문구 제기동',
                '용도: 단독주택',
                '대지면적: 86㎡',
                '건물규모: 지상1층',
                '프로젝트 유형: 리모델링'
            ],
            images: ['jegi_vacation_1.jpg', 'jegi_vacation_2.jpg', 'jegi_vacation_3.jpg']
        }
    },
    {
        id: 7,
        title: '성북동 삶',
        categories: ['ARCHITECTURE', 'RESIDENTIAL'],
        year: '2022',
        location: '',
        image: 'seongbuk.jpg',
        description: '도시 속 작은 집',
        details: {
            description: [
                '',
                '대지위치: 서울시 성북구 성북동',
                '용도: 단독주택',
                '대지면적: 65.76㎡',
                '건물규모: 지하1층 지상2층',
                '건축면적: 26.13㎡',
                '연면적: 83.78㎡'
            ],
            images: ['seongbuk_1.jpg', 'seongbuk_2.jpg', 'seongbuk_3.jpg', 'seongbuk_4.jpg']
        }
    },
    {
        id: 8,
        title: 'NEW COMMUN',
        categories: ['ARCHITECTURE', 'COMMERCIAL'],
        year: '2022',
        location: '',
        image: 'newcommun.jpg',
        description: '기능적 장식',
        details: {
            description: [
                '한양대학교 대학원 건축 설계 프로젝트 tutor 김재경',
                '기능적 장식',
                '골목길을 걷다보면 의식없이 만나게 되는 건물들이 있다. 동네는 저마다 다르지만 매번 같은 모습으로 서 있어 마치 배경화면이 되어버린 듯한 건축물들이다. 규모는 대게 반지층에서 2~3층 규모의 다가구 주택이다. 붉은 벽돌 또는 타일로 구축되어있고 과거의 건축법규 규정으로 계단과 복도가 외부로 돌출 된 형태가 지배적이다. 대부분 지역이 재개발로 인해 사라졌지만 아직도 대학가나 재개발이 해제된 지역에선 주위를 둘러보면 너무나 쉽게 볼 수 있는 건물들이다. 90년대부터 그 지역의 필요에 따라 상가로 용도를 변경하거나 또는 불법으로 외부 계단을 실내로 만들고 옥상에 샌드위치 판낼을 이용하여 증축보수 한 정도가 대부분이다. 무심코 지나치던 건물들의 미학적 구축방식과 현대적 가능성을 탐구 하고자 한다. 단순한 장식의 재구성이 아닌 과거의 경험을 현재의 기능과 접목시켜 익숙한 풍경을 새롭게 구성하였다.'
            ],
            images: ['newcommun_1.jpg', 'newcommun_2.jpg', 'newcommun_3.jpg', 'newcommun_4.jpg']
        }
    },
    {
        id: 9,
        title: 'Alignment Wall',
        categories: ['ARCHITECTURE', 'RESIDENTIAL'],
        year: '2022',
        location: '',
        image: 'alignment.jpg',
        description: '도시 속 작은 집',
        details: {
            description: [
                '',
                '대지위치: 서울시 관악구',
                '용도: 다가구주택',
                '대지면적: 165㎡',
                '건물규모: 지하1층, 지상4층',
                '건축면적: 99㎡'
            ],
            images: ['alignment_1.jpg', 'alignment_2.jpg', 'alignment_3.jpg']
        }
    },
    {
        id: 10,
        title: 'PIKNIC',
        categories: ['ARCHITECTURE', 'COMMERCIAL'],
        year: '2021',
        location: '',
        image: 'piknic.jpg',
        description: '오피스 공공성 고찰',
        details: {
            description: [
                '한양대학교 대학원 건축 설계 프로젝트 tutor 서재원',
                '오피스 공공성 고찰',
                "공공성이란 '국가나 사회구성원에게 두루 관계되는 것이다. \"공공\"이라는 단어는 개인을 일컷는 말이 아니라 사회구성원 모두를 포함하는 언어이다. 장소에 공공성이 붙는 다는 것은 모두에게 열려 있어야 하고 조금 더 적극적으로 접근 가능할 수 있어야 한다. 서울의 상징인 광화문 광장을 면하고 있는 고층 오피스 파사드에 산책로를 조성하여 공공성을 부여 하였다."
            ],
            images: ['piknic_1.jpg', 'piknic_2.jpg', 'piknic_3.jpg', 'piknic_4.jpg']
        }
    },
    {
        id: 11,
        title: 'Bori House',
        categories: ['ARCHITECTURE', 'RESIDENTIAL'],
        year: '2017',
        location: '',
        image: 'bori.jpg',
        description: '도시 속 작은 주택',
        details: {
            description: [
                '',
                '대지위치: 경기도 이천시',
                '용도: 단독주택',
                '건물규모: 1층',
                '건축면적: 147.51㎡',
                '',
                '형선윤건축사사무소 협업'
            ],
            images: ['bori_1.jpg', 'bori_2.jpg', 'bori_3.jpg']
        }
    }
];

// 라우트 설정
app.get('/', (req, res) => {
    res.redirect('/about');
});

// About 페이지 라우트 추가
app.get('/about', (req, res) => {
    res.render('pages/about');
});

app.get('/projects', (req, res) => {
    res.render('pages/projects', { 
        projects,
        title: 'Works'
    });
});

// Contact 페이지 라우트 추가
app.get('/contact', (req, res) => {
    res.render('pages/contact');
});

// 프로젝트 상세 페이지 라우트
app.get('/project/:id', (req, res) => {
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if (!project) return res.status(404).send('Project not found');
    res.render('pages/project-detail', { project });
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행중입니다.`);
}); 
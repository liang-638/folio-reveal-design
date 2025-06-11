
-- 創建作品集數據表
CREATE TABLE public.portfolio_works (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL CHECK (section IN ('illustration', 'character', 'game', 'awards')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 創建個人資料表
CREATE TABLE public.profile_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Designer Name',
  title TEXT NOT NULL DEFAULT 'Digital Artist & Game Designer',
  email TEXT NOT NULL DEFAULT 'contact@example.com',
  website TEXT NOT NULL DEFAULT 'www.portfolio.com',
  location TEXT NOT NULL DEFAULT 'Location',
  about_me TEXT[] NOT NULL DEFAULT ARRAY[
    'Welcome to my creative portfolio! I am a passionate digital artist and game designer with expertise in illustration, character design, and interactive media.',
    'My work spans across various mediums, from traditional digital art to immersive game experiences. I believe in creating visually compelling narratives that engage and inspire audiences.',
    'With years of experience in the industry, I have developed a unique style that blends artistic creativity with technical innovation.'
  ],
  game_description TEXT DEFAULT 'My game design projects focus on creating immersive experiences that combine compelling storytelling with innovative gameplay mechanics. Each project represents a unique exploration of interactive entertainment, from RPG adventures to puzzle platforms, emphasizing player engagement and visual excellence.',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 插入初始作品數據
INSERT INTO public.portfolio_works (section, title, description, image, sort_order) VALUES
-- Illustration section
('illustration', 'Abstract Landscapes', 'A series of abstract landscape illustrations exploring the relationship between nature and digital art.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749573761/%E6%8F%92%E5%9C%9642_mkg3jd.jpg', 1),
('illustration', 'Character Portraits', 'Digital portraits focusing on unique character expressions and emotions.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749575482/257_20250528200852_cwaell.jpg', 2),
('illustration', 'Conceptual Art', 'Conceptual illustrations for various creative projects and campaigns.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749575703/%E6%8F%92%E5%9C%9619_elguap.jpg', 3),
('illustration', 'Digital Paintings', 'Digital paintings exploring different artistic styles and techniques.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749573585/%E6%8F%924_saf4ez.jpg', 4),
('illustration', 'Environment Design', 'Environment and background illustrations for games and media.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749573757/%E6%8F%92%E5%9C%9663_ppkh4v.jpg', 5),
('illustration', 'Book Illustrations', 'Illustration work for children''s books and publications.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749573507/%E6%88%91%E6%83%B3%E4%B8%8D%E5%88%B0_tnvs8q.png', 6),

-- Character section
('character', 'Fantasy Heroes', 'Character designs for fantasy RPG games featuring unique heroes and protagonists.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749573507/8906_j33bi9.png', 1),
('character', 'Anime Characters', 'Anime-style character designs with detailed expressions and costumes.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749573627/%E6%8F%92%E5%9C%9627_jqcmnr.jpg', 2),
('character', 'Mascot Design', 'Mascot character designs for brands and organizations.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749573508/486_p05vje.png', 3),
('character', 'Game NPCs', 'Non-player character designs for various game projects.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749573595/%E6%8F%92%E5%9C%9672_lufs1z.jpg', 4),
('character', 'Cartoon Characters', 'Stylized cartoon characters for animation and media.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749573510/1982_ovupsz.png', 5),
('character', 'Character Concepts', 'Early concept art and character development sketches.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749575721/%E6%8F%92%E5%9C%9610_x88zvi.jpg', 6),

-- Game section
('game', 'RPG Adventure', 'A complete role-playing game with intricate storylines and character development.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749574003/%E6%9C%A8%E5%B1%8B20_vq9r8e.jpg', 1),
('game', 'Puzzle Platform', 'An innovative puzzle-platform game featuring unique mechanics.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749573953/%E6%A1%82%E8%8A%B1%E6%A3%AE%E6%9E%97_oiezlc.png', 2),
('game', 'Mobile Game', 'Casual mobile game design with engaging gameplay and visual aesthetics.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749573984/%E5%9C%96%E6%9B%B8%E9%A4%A8CG-2_dpqdgi.png', 3),
('game', 'Indie Project', 'Independent game project showcasing creative storytelling and art direction.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749573793/56566323656565_knt1ak.png', 4),

-- Awards section
('awards', 'Design Excellence Award', 'Recognition for outstanding achievement in digital design and illustration.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749577949/IMG_20250611_014414_1_cnlgwy.jpg', 1),
('awards', 'Adobe Certified Expert', 'Professional certification in Adobe Creative Suite applications.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749577949/IMG_20250611_014414_1_cnlgwy.jpg', 2),
('awards', 'Game Design Certificate', 'Completion certificate from advanced game design program.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749578096/%E9%80%99%E6%98%AF%E8%AD%89%E7%85%A7_page-0001_aciml7.jpg', 3),
('awards', 'Animation Workshop', 'Certificate of completion from professional animation workshop.', 'https://res.cloudinary.com/dk0qcbeic/image/upload/v1749578257/IMG_20250611_015605_1_qmnp2y.jpg', 4);

-- 插入初始個人資料
INSERT INTO public.profile_data (id) VALUES (gen_random_uuid());

-- 啟用即時更新功能
ALTER TABLE public.portfolio_works REPLICA IDENTITY FULL;
ALTER TABLE public.profile_data REPLICA IDENTITY FULL;

-- 將表格加入即時發布
ALTER PUBLICATION supabase_realtime ADD TABLE public.portfolio_works;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profile_data;

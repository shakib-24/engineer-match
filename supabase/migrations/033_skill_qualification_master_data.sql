-- Seeds the previously-empty skill/qualification master tables
-- (skill_levels, skill_categories, skill_subcategories, skills,
-- qualifications -- all created in 003_master_tables.sql but never seeded by
-- any prior migration, confirmed by searching every migration file for
-- INSERT INTO on these five tables before writing this one).
--
-- Names are not invented: the 14 skill names are exactly
-- SKILL_OPTIONS in src/constants/engineer-profile.ts (the mock technical
-- skill picker this migration replaces with real data), and the 3
-- qualifications are exactly the old CERTIFICATIONS mock in the same file.
-- Category/subcategory grouping is new organizational structure only
-- (required by the schema's category_id/subcategory_id FKs), not fabricated
-- skill data. HUMAN/BUSINESS skill_categories rows are intentionally not
-- seeded here -- per 030_skill_assessments.sql's header comment, Human/
-- Business skills are modeled entirely through the separate
-- skill_assessments system, not through skills/skill_categories.

INSERT INTO public.skill_levels (level, name, description) VALUES
    (1, 'エントリレベル', '指導を受けながら業務を遂行'),
    (2, '基礎レベル', '一定の指導のもと業務を遂行'),
    (3, '独り立ちレベル', '独力で要求作業を遂行'),
    (4, 'プロフェッショナルレベル', '専門知識で業務をリード'),
    (5, 'ハイスペシャリストレベル', '後進を指導できる専門性'),
    (6, 'エキスパートレベル', '卓越した知識と経験'),
    (7, 'トップレベル', '国内外で通用する第一人者')
ON CONFLICT (level) DO NOTHING;

INSERT INTO public.skill_categories (code, name, display_order) VALUES
    ('TECHNICAL', 'テクニカルスキル', 1)
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.skill_subcategories (category_id, name, display_order)
SELECT sc.id, v.name, v.display_order
FROM public.skill_categories sc
JOIN (VALUES
    ('フロントエンド', 1),
    ('バックエンド', 2),
    ('インフラ・クラウド', 3),
    ('データベース', 4)
) AS v(name, display_order) ON TRUE
WHERE sc.code = 'TECHNICAL'
ON CONFLICT (category_id, name) DO NOTHING;

INSERT INTO public.skills (subcategory_id, name, display_order)
SELECT ssc.id, v.name, v.display_order
FROM public.skill_subcategories ssc
JOIN public.skill_categories sc ON sc.id = ssc.category_id AND sc.code = 'TECHNICAL'
JOIN (VALUES
    ('フロントエンド', 'React', 1),
    ('フロントエンド', 'TypeScript', 2),
    ('フロントエンド', 'Next.js', 3),
    ('バックエンド', 'Java', 1),
    ('バックエンド', 'Spring Boot', 2),
    ('バックエンド', 'Python', 3),
    ('バックエンド', 'Node.js', 4),
    ('バックエンド', 'Go', 5),
    ('バックエンド', 'GraphQL', 6),
    ('インフラ・クラウド', 'AWS', 1),
    ('インフラ・クラウド', 'Docker', 2),
    ('インフラ・クラウド', 'Kubernetes', 3),
    ('データベース', 'PostgreSQL', 1),
    ('データベース', 'MySQL', 2)
) AS v(subcategory_name, name, display_order) ON v.subcategory_name = ssc.name
ON CONFLICT (subcategory_id, name) DO NOTHING;

INSERT INTO public.qualifications (name, organization, category, display_order) VALUES
    ('基本情報技術者試験', '情報処理推進機構（IPA）', 'IT', 1),
    ('AWS Certified Solutions Architect – Associate', 'Amazon Web Services', 'IT', 2),
    ('JLPT N2', '日本語能力試験', '語学', 3)
ON CONFLICT (organization, name) DO NOTHING;

-- Business Skill self-assessment data. Pure data insert against the generic
-- schema created in 030_skill_assessments.sql -- no schema/RLS changes needed
-- (skill_assessments.category already allows 'BUSINESS', and every policy on
-- these four tables is category-agnostic).
--
-- Seeds the 6 BUSINESS assessments from the latest spec (課題解決力 /
-- 論理的思考力 / タスク管理力 / 主体性 / チームワーク力 / 調整・交渉力). This
-- supersedes the 5-name placeholder mentioned in 030's comments
-- (論理的思考力 / 問題解決力 / 情報収集力 / プロジェクトマネジメント力 / 交渉力),
-- which was never seeded and only ever existed as static mock UI data in
-- src/constants/engineer-profile.ts -- confirmed via repo-wide search before
-- writing this migration, so no production data is affected by the rename.

INSERT INTO public.skill_assessments (code, category, name, display_order) VALUES
    ('BUSINESS_PROBLEM_SOLVING', 'BUSINESS', '課題解決力', 1),
    ('BUSINESS_LOGICAL_THINKING', 'BUSINESS', '論理的思考力', 2),
    ('BUSINESS_TASK_MANAGEMENT', 'BUSINESS', 'タスク管理力', 3),
    ('BUSINESS_INITIATIVE', 'BUSINESS', '主体性', 4),
    ('BUSINESS_TEAMWORK', 'BUSINESS', 'チームワーク力', 5),
    ('BUSINESS_NEGOTIATION', 'BUSINESS', '調整・交渉力', 6)
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.skill_assessment_questions (assessment_id, level, question_order, question_text)
SELECT sa.id, q.level, q.question_order, q.question_text
FROM public.skill_assessments sa
JOIN (VALUES
    ('BUSINESS_PROBLEM_SOLVING', 1, 1, '目の前の問題に対して、指示された対応策を実行できる'),
    ('BUSINESS_PROBLEM_SOLVING', 1, 2, '問題が発生したことを、早期に周囲へ共有できる'),
    ('BUSINESS_PROBLEM_SOLVING', 2, 3, '過去の事例やマニュアルを参考に、自分で対応策を選べる'),
    ('BUSINESS_PROBLEM_SOLVING', 2, 4, '問題の原因を、事実に基づいて切り分けられる'),
    ('BUSINESS_PROBLEM_SOLVING', 3, 5, '前例のない問題に対しても、複数の解決策を考えられる'),
    ('BUSINESS_PROBLEM_SOLVING', 3, 6, '解決策のメリット・デメリットを比較して選べる'),
    ('BUSINESS_PROBLEM_SOLVING', 4, 7, '根本原因まで遡り、再発防止策を設計できる'),
    ('BUSINESS_PROBLEM_SOLVING', 4, 8, '複数の部門にまたがる問題でも、全体最適の解決策を考えられる'),
    ('BUSINESS_PROBLEM_SOLVING', 5, 9, '顕在化していない潜在的な課題を先回りして発見できる'),
    ('BUSINESS_PROBLEM_SOLVING', 5, 10, '組織全体に影響する問題を、仕組みごと変えて解決できる'),

    ('BUSINESS_LOGICAL_THINKING', 1, 1, '物事を順序立てて説明できる'),
    ('BUSINESS_LOGICAL_THINKING', 1, 2, '結論と理由を分けて話せる'),
    ('BUSINESS_LOGICAL_THINKING', 2, 3, '情報を整理し、共通点や相違点に分けられる'),
    ('BUSINESS_LOGICAL_THINKING', 2, 4, '話の矛盾点に自分で気づける'),
    ('BUSINESS_LOGICAL_THINKING', 3, 5, '複数の情報から、筋道立てた結論を導き出せる'),
    ('BUSINESS_LOGICAL_THINKING', 3, 6, '主張に対して、根拠となるデータや事実を示せる'),
    ('BUSINESS_LOGICAL_THINKING', 4, 7, '複雑な事象を、構造化して整理・説明できる'),
    ('BUSINESS_LOGICAL_THINKING', 4, 8, '前提や仮説を疑い、別の視点で検証できる'),
    ('BUSINESS_LOGICAL_THINKING', 5, 9, '不確実な情報の中でも、論理的に意思決定を下せる'),
    ('BUSINESS_LOGICAL_THINKING', 5, 10, '複雑な問題を、他者が理解しやすい形にモデル化できる'),

    ('BUSINESS_TASK_MANAGEMENT', 1, 1, '与えられたタスクを、期限内にこなせる'),
    ('BUSINESS_TASK_MANAGEMENT', 1, 2, '自分の作業状況を、求められれば報告できる'),
    ('BUSINESS_TASK_MANAGEMENT', 2, 3, '複数のタスクに優先順位をつけて進められる'),
    ('BUSINESS_TASK_MANAGEMENT', 2, 4, '進捗を自発的に共有し、遅れの兆候を早めに伝えられる'),
    ('BUSINESS_TASK_MANAGEMENT', 3, 5, '予定外の割り込み対応が入っても、全体のスケジュールを調整できる'),
    ('BUSINESS_TASK_MANAGEMENT', 3, 6, 'タスクの工数を見積もり、現実的な計画を立てられる'),
    ('BUSINESS_TASK_MANAGEMENT', 4, 7, '複数人が関わるタスクの進捗を管理し、ボトルネックを解消できる'),
    ('BUSINESS_TASK_MANAGEMENT', 4, 8, 'リスクを事前に想定し、対応策を用意しておける'),
    ('BUSINESS_TASK_MANAGEMENT', 5, 9, '部門や案件をまたぐ複数プロジェクトを同時に管理できる'),
    ('BUSINESS_TASK_MANAGEMENT', 5, 10, '状況変化に応じて、計画自体を柔軟に組み替えられる'),

    ('BUSINESS_INITIATIVE', 1, 1, '指示されたことに対して、自分から取り組み始められる'),
    ('BUSINESS_INITIATIVE', 1, 2, 'わからないことがあれば、自分から質問できる'),
    ('BUSINESS_INITIATIVE', 2, 3, '指示がなくても、次にやるべきことに気づいて動ける'),
    ('BUSINESS_INITIATIVE', 2, 4, '自分の担当範囲について、改善点を提案できる'),
    ('BUSINESS_INITIATIVE', 3, 5, '担当範囲を超えた課題にも、自ら関わろうとできる'),
    ('BUSINESS_INITIATIVE', 3, 6, '失敗を恐れず、新しいやり方に挑戦できる'),
    ('BUSINESS_INITIATIVE', 4, 7, 'チームや周囲を巻き込みながら、自発的に物事を進められる'),
    ('BUSINESS_INITIATIVE', 4, 8, '誰も担当していない課題を、自ら見つけて引き受けられる'),
    ('BUSINESS_INITIATIVE', 5, 9, '組織の方針や目標を踏まえ、自ら新しい取り組みを立案・推進できる'),
    ('BUSINESS_INITIATIVE', 5, 10, '周囲を動かし、自発的な行動を組織全体に広げられる'),

    ('BUSINESS_TEAMWORK', 1, 1, 'チームの決定事項に従って、自分の役割を果たせる'),
    ('BUSINESS_TEAMWORK', 1, 2, '困っているメンバーに気づいたら、声をかけられる'),
    ('BUSINESS_TEAMWORK', 2, 3, '自分の状況をチームに共有し、協力を求められる'),
    ('BUSINESS_TEAMWORK', 2, 4, '他のメンバーの作業を手伝うことができる'),
    ('BUSINESS_TEAMWORK', 3, 5, '意見の違うメンバーとも、協力して物事を進められる'),
    ('BUSINESS_TEAMWORK', 3, 6, 'チーム内の情報格差をなくすよう、共有を工夫できる'),
    ('BUSINESS_TEAMWORK', 4, 7, 'チームの目標達成のために、自分の役割を超えて動ける'),
    ('BUSINESS_TEAMWORK', 4, 8, 'メンバー同士の対立を和らげ、協力関係を保てる'),
    ('BUSINESS_TEAMWORK', 5, 9, 'チーム全体の力を引き出すよう、役割分担や進め方を設計できる'),
    ('BUSINESS_TEAMWORK', 5, 10, '複数チームが関わる場面でも、協力関係を築き成果につなげられる'),

    ('BUSINESS_NEGOTIATION', 1, 1, '相手の要望を正確に聞き取れる'),
    ('BUSINESS_NEGOTIATION', 1, 2, '自分の希望や条件を、相手に伝えられる'),
    ('BUSINESS_NEGOTIATION', 2, 3, '決まったルールや前例に沿って、相手と調整できる'),
    ('BUSINESS_NEGOTIATION', 2, 4, '意見の相違があっても、感情的にならず話し合いを進められる'),
    ('BUSINESS_NEGOTIATION', 3, 5, '双方にとって納得できる落としどころを提案できる'),
    ('BUSINESS_NEGOTIATION', 3, 6, '相手の立場や事情を踏まえた上で交渉できる'),
    ('BUSINESS_NEGOTIATION', 4, 7, '利害が対立する複数の相手の間に立って調整できる'),
    ('BUSINESS_NEGOTIATION', 4, 8, '交渉が難航した場面でも、代替案を出して打開できる'),
    ('BUSINESS_NEGOTIATION', 5, 9, '複数の部門・組織が関わる複雑な調整を主導できる'),
    ('BUSINESS_NEGOTIATION', 5, 10, '長期的な関係を維持しながら、双方に利益のある合意を導ける')
) AS q(code, level, question_order, question_text)
    ON q.code = sa.code
ON CONFLICT (assessment_id, question_order) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.application_training_proposal (
    application_id UUID PRIMARY KEY REFERENCES public.applications (id) ON DELETE CASCADE,
    proposed_rate INTEGER NOT NULL,
    proposal_note TEXT,
    proposed_schedule VARCHAR(200),
    attachment_url VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_application_training_proposal_rate CHECK (proposed_rate >= 1),
    CONSTRAINT chk_application_training_proposal_note_length CHECK (
        proposal_note IS NULL OR char_length(trim(proposal_note)) BETWEEN 1 AND 2000
    ),
    CONSTRAINT chk_application_training_proposal_schedule_length CHECK (
        proposed_schedule IS NULL OR char_length(trim(proposed_schedule)) BETWEEN 1 AND 200
    ),
    CONSTRAINT chk_application_training_proposal_attachment_length CHECK (
        attachment_url IS NULL OR char_length(trim(attachment_url)) BETWEEN 1 AND 255
    )
);

ALTER TABLE public.application_training_proposal ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS trg_application_training_proposal_updated_at ON public.application_training_proposal;
CREATE TRIGGER trg_application_training_proposal_updated_at
    BEFORE UPDATE ON public.application_training_proposal
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

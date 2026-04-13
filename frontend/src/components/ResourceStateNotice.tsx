interface ResourceStateNoticeProps {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function ResourceStateNotice({
  eyebrow,
  title,
  description,
  actionLabel,
  onAction,
}: ResourceStateNoticeProps) {
  return (
    <div className="resource-empty">
      <p className="resource-empty__eyebrow">{eyebrow}</p>
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel && onAction && (
        <button className="resource-detail__primary resource-empty__action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

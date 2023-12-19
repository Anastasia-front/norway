interface Props {
  name: string;
}

export function Subtitle({ name = "Subtitle" }: Props) {
  return <h3 className="subtitle">{name}</h3>;
}

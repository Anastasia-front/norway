interface Props {
  name: string;
}

export function Title({ name = "Title" }: Props) {
  return <h2 className="title">{name}</h2>;
}

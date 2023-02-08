import { FC } from "react";
import { Link } from "react-router-dom";
import './styles.css';

const MenuItem: FC<{url : string, name: string}> = ({ url, name }) => {
  return (
    <Link className="menu" to={url}>{name}</Link>
  );
}

export default MenuItem;

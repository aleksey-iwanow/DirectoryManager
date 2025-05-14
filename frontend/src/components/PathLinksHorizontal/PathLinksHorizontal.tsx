import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
    path: string | undefined;
    first_link_url?: string;
    first_link_name?: string;
}

export default function PathLinksHorizontal({ path, first_link_url = "/blob/", first_link_name = "uploads" }: Props) {
    const [links, setLinks] = useState<any[]>();

    useEffect(() => {
        if (path) {
            const split_path = path.split('/');

            setLinks(split_path.map((name, index) => (
                {
                    name: name,
                    path: `/blob/${split_path.slice(0, index + 1).join('/')}`,
                }
            )));
        }

    })

    return (<div>
        <span style={{ margin: "0 5px" }}>/</span>
        <Link to={first_link_url}>{first_link_name}</Link>
        {links?.map((link, index) => (
            <span key={index}>
                <span style={{ margin: "0 5px" }}>/</span>
                {links.length - 1 == index ?
                    <span className='span_bold'>{link.name}</span>
                    :
                    <Link to={link.path}>{link.name}</Link>
                }
            </span>
        ))}
    </div>);
}
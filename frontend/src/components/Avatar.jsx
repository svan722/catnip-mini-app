import { Link } from "./Link";

const Avatar = ({ userid, width, height, username }) => {
    return username ?
        <Link to={`https://t.me/${username}`}><img className="rounded-full" src={`/api/v1/users/avatar/${userid}`}  alt="avatar" width={width} height={height} /></Link> :
        <img className="rounded-full" src={`/api/v1/users/avatar/${userid}`}  alt="avatar" width={width} height={height} />
}

export default Avatar;
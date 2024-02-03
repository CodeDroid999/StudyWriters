import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames'
import Link from 'next/link';


type Props = {
    preview?: boolean
}

const Alert = ({ preview }: Props) => {
    return (
        <div className="items-right text-right bg-green-900 text-gray-100">
            <Link href="/refer-a-friend" className="text-right pt-1 pb-1 pr-4 text-yellow-600 ">
                Earn: Refer a friend
            </Link>
        </div>
    )
}

export default Alert

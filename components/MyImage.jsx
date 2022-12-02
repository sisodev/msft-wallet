import Image from 'next/image'
import { useAppContext } from '../store/AppContext'




const myLoader = ({src, width, quality }) => {
    const {hostname} = useAppContext();
    return `https://${hostname}/${src}?w=${width}&q=${quality || 75}`
  }
  

export default function MyImage({src, width, height}){
    return (
        <Image
          loader={myLoader}
          src={src}
          alt={"passport_image"}
          width={width}
          height={height}
        />
      )
}
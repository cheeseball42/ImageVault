import { Menu, MenuButton, MenuItem, MenuList, Box, IconButton, Heading, SimpleGrid, Avatar, Card, CardBody, CardFooter , Image, AspectRatio} from "@chakra-ui/react"
import {FiTrash2, FiUploadCloud, FiEdit, FiLock} from "react-icons/fi"
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

export const sampleImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
];

function GetRandomImage(){
    return sampleImages[Math.floor(Math.random() * sampleImages.length)]
}

function GalleryTile({url, deleteImage}){
    const navigate = useNavigate();
    return <Card bgColor="whiteAlpha.500">
        {/* <CardHeader></CardHeader> */}
        <CardBody>
            <AspectRatio ratio={3/2} w="full">
                <Image src={url} loading="lazy" objectFit="cover"/>
            </AspectRatio>
        </CardBody>
        <CardFooter display="flex" alignItems="center" justifyContent="center">
            <IconButton onClick={()=>{navigate("/editor")}} icon={<FiEdit/>} colorScheme="blue" variant="ghost" aria-label="Edit image"></IconButton>
            <IconButton onClick={deleteImage} icon={<FiTrash2/>} colorScheme="red" variant="ghost" aria-label="Delete image"></IconButton>
        </CardFooter>
    </Card>
}

function Gallery({images, setImages}){
    const navigate = useNavigate();
    const onFileSelected = (e)=>{
        const file = e.target.files?.[0];
        if(!file) return;
        navigate("/editor");
    }
    const openFilePicker = () => {fileInputRef.current?.click();}
    const fileInputRef = useRef()
    return (<Box minH="100vh" minW="100vw" display="flex" alignItems="center" justifyContent="center" bgGradient="linear(to-br, blue.900, blue.700, purple.900)">
        <NavBar/>
        <SimpleGrid marginTop="71" marginBottom="7" columns={[1, 2, 3, 4]} w="full" spacing={6} padding={3}>
            {images.map((image)=><GalleryTile key={image.key} url={image.url} deleteImage={()=>{setImages(images.filter(i=>i.key != image.key))}}/>)}
        </SimpleGrid>
        <input ref={fileInputRef} type="file" accept="image/*" style={{display: "none"}} onChange={onFileSelected}/>
        <IconButton onClick={openFilePicker} w="20" h="20" borderRadius={"full"} icon={<FiUploadCloud fontSize={40}/>} position="fixed" colorScheme="blue" variant="solid" right={4} bottom={9}></IconButton>
        <Footer/>
    </Box>)
}

function GalleryWrapper(){
    function retrieveImages(){
        return Array(100).fill(1).map((_, index)=>{return {
            url: GetRandomImage(),
            key: `${index}`
        }})
    }
    const [images, setImages] = useState(retrieveImages)
    return <Gallery images={images} setImages={setImages}></Gallery>
}

export default GalleryWrapper;
import { useParams } from "react-router";

const TextWithColor = () =>{
    
    const{word,color,bgcolor} = useParams();

    const headingStyle = {
        color: color,  
        backgroundColor: bgcolor, 
      };


    return(
        <h1 style={headingStyle}> ++++ The word is: {word} ++++</h1>
    );
} 
export default TextWithColor
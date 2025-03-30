import { useEffect, useState } from "react";
import styles from "./FileBrowser.module.css";
import ListItem from "../ListItem/ListItem";
import { useParams } from "react-router-dom";
import Code from "../Code/Code";
import TogglePanel from "../TogglePanel/TogglePanel";


export default function FileBrowser() {
  const { "*": path } = useParams();
  const [content, setContent] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [textBlockStyleSelected, setTextBlockStyleSelected] = useState("");
  const [toggleElements, setToggleElements] = useState<string[]>([]);
  

  const loadFileContent = async () => {
    try {
      const response = await fetch(`http://localhost:8080/uploads/${path}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const data = await response.json();
        return { mes: data.message, err: true };
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  function renderContent() {
    if (content?.err) {
      return <pre>{content.mes}</pre>;
    }
    if (content?.isFolder) {
      return (
        <div className={styles.folder}>
          {path && (
            <ListItem key="..." name="..." path={content.parentPath} isFolder={true}></ListItem>
          )}
          {content.data.map((item: any) => (
            <ListItem key={item.name} name={item.name} path={item.path} isFolder={item.isFolder}></ListItem>
          ))}
        </div>
      );
    } else {
      if (content?.isImage) {
        
        return (
          <div className={styles.file}>
            <img src={`http://localhost:8080/download/${content.data}`} alt={content.name} />
          </div>
        );
      } else {
        return (
          <div className={styles.file}>
            {textBlockStyleSelected == "Text" ? 
            <pre>{content.data}</pre>
            : <Code language={content.extName}>{content.data}</Code>}
          </div>
        );
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await loadFileContent();
      if (data.isImage){
        setToggleElements([]);
      }
      else{
        setToggleElements(["Code", "Text"]);
      }
      setContent(data);
      setIsLoading(false);
    };

    fetchData();
  }, [path]);


  return (
    <div className={styles.file_browser}>
      {/* Отображаем полосу загрузки */}
      {isLoading && (
        <div className={styles.progress_bar}></div>
      )}
      <div className={styles.title}>
        {content && (!content.isFolder ? <div className="flex_center_align flex_space_between">
          <div className="flex_center_align gap">
            {toggleElements.length > 0 && 
            <TogglePanel onchange={setTextBlockStyleSelected} elements={toggleElements}/>}
            <p>{content.size}kb</p>
            <p>{content.countLines} lines</p>
          </div>
          <div className="flex_center_align">
            
          </div>
        </div>
        : <p>{content.name}</p>)}
      </div>
      <div className={styles.content}>
        {content && renderContent()}
      </div>
    </div>
  );
}
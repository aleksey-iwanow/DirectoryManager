import { useEffect, useState } from "react";
import styles from "./FileBrowser.module.css";
import ListItem from "../ListItem/ListItem";
import { Link, useLocation, useParams, useResolvedPath } from "react-router-dom";
import { getPreviousFolder } from "../../utils/FilesManager";
import Code from "../Code/Code";


export default function FileBrowser() {
  const {"*": path}  = useParams();
  
  const [content, setContent] = useState<any | null>();

  const loadFileContent = async () => {
    try {
      const response = await fetch(`http://localhost:8080/uploads/${path}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      });
      if (!response.ok){
        var data = await response.json();
        return {mes: data.message, err: true}
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  function renderContent() {
    if (content.err){
      return <pre>{content.mes}</pre>;
    }
    if (content.isFolder) {
      return (
        <div className={styles.folder}>
          {
            path &&
            <ListItem name="..." path={content.parentPath} isFolder={true}></ListItem>
          }
          {content.data.map((item:any) => (
            <ListItem name={item.name} path={item.path} isFolder={item.isFolder}></ListItem>
            
          ))}
        </div>
      );
    } else {
      return <div className={styles.file}>
        <Code language={content.type}>{content.data}</Code>
      </div>;
    }
  }

  function fetchData() {
    const fileContent = loadFileContent();
    fileContent.then(fl => {
      setContent(fl);
    })
    
  }

  useEffect(() => {
    fetchData();
  }, [path]);

  return (
    <div className={styles.file_browser}>
      <div className={styles.title}>
        <p>{content && (content.name || 'Uploads')}</p>
      </div>
      <div className={styles.content}>
        {content && renderContent()}
      </div>
    </div>
  );
}
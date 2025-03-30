import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Импортируйте темную тему
import 'prismjs/components/prism-markup'; // Импортируйте HTML через markup
import 'prismjs/components/prism-javascript'; // Импортируйте JavaScript
import 'prismjs/components/prism-json'; // Импортируйте JSON
import 'prismjs/components/prism-css'; // Импортируйте CSS
import './Code.css';

interface CodeProps {
    language: string;
    children: string; // Измените тип на string, так как мы ожидаем текст
    className_?: string;
}

export default function Code({ className_, language, children }: CodeProps) {
    const codeRef = useRef<HTMLPreElement>(null);

    useEffect(() => {
        // Подсветка синтаксиса после рендеринга
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, [children]); // Запускаем эффект при изменении текста



    return (
            <pre className={`code_block ${className_}`}>
                <code ref={codeRef} className={`language-${language}`}>
                    {children}
                </code>
            </pre>
        
    );
}
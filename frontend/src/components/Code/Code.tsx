import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './Code.css'

interface CodeProps {
    language: string;
    children: any;
    className_?: string;
}

export default function Code ({className_, language, children }:CodeProps) {
    return (
    <div className={`code_block ${className_}`}>
        <SyntaxHighlighter language={language} style={theme} showLineNumbers>
            {children}
        </SyntaxHighlighter>
    </div>
    );
};
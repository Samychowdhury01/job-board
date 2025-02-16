import React from 'react';
import ReactMarkdown from 'react-markdown'
type TMarkdownReaderProps = {
    children: string;
}

const MarkdownReader = ({children}: TMarkdownReaderProps) => {
    return (
        <ReactMarkdown
        className='space-y-3'
        components={{
            ul: (props) => <ul className='list-inside list-disc'  {...props}/>,
            a :(props) => <a className='text-green-400 underline' target='_blank'  {...props}/>,
        }}
        >
            {children}
        </ReactMarkdown>
    );
};

export default MarkdownReader;
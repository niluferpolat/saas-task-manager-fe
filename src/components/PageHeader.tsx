import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";


interface PageHeaderProps {
  title: string;
  text: string;
  buttonProps?: {
    onClick: () => void;
    label: string;
  }
}
function PageHeader({ title, text, buttonProps }: PageHeaderProps) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"2rem",padding:"0 1rem"}}>
      <div>
        <h2>{title}</h2>
        <p style={{color:"#666",lineHeight:"1.5px",fontSize:"14px"}}>{text}</p>
      </div>
      {buttonProps && (
        <Button
        size="md"
        leftSection={<IconPlus size={16} />}
          onClick={buttonProps.onClick}
          style={{
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            }}
        >
          {buttonProps.label}
        </Button>
      )}
    </div>
  )
}

export default PageHeader
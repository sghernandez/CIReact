import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert }  from 'react-bootstrap';

export default function Alerts(props) {
  
    if (props.show) 
    {
      return (
        <div style={{ margin: '20px 30px  0 30px' }}>
        <Alert variant={ props.variante } onClose={ props.handleClose } dismissible>
          <Alert.Heading>Information...</Alert.Heading>
          <p>
            { props.message }
          </p>
        </Alert>
        </div>
      );
    }
    
    return '';

  }
  


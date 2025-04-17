import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EducationPage = () => (
  <Container>
    <Typography variant="h4" gutterBottom>Learn About Scams</Typography>
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>UPI Scams</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          UPI scams often involve fraudsters tricking you into authorizing payments or revealing your UPI PIN. Always verify UPI requests.
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>SMS Scams</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Be cautious of messages claiming lottery wins, free gifts, or urgent actions. Avoid clicking on suspicious links.
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Phishing</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Phishing scams trick you into sharing confidential information. Always verify emails and websites before entering details.
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Typography variant="h5" gutterBottom style={{ marginTop: '24px' }}>Dos and Don'ts</Typography>
    <List>
      <ListItem>
        <ListItemText primary="Do not share OTPs or UPI PINs with anyone." />
      </ListItem>
      <ListItem>
        <ListItemText primary="Always verify unknown phone numbers and messages." />
      </ListItem>
      <ListItem>
        <ListItemText primary="Do not click on unknown links or download suspicious files." />
      </ListItem>
      <ListItem>
        <ListItemText primary="Use strong passwords and enable two-factor authentication." />
      </ListItem>
    </List>
  </Container>
);

export default EducationPage;

// src/pages/EducationPage.js
import React, { useState } from 'react';
import {
    Container, Typography, Paper, Box, Accordion, AccordionSummary,
    AccordionDetails, List, ListItem, ListItemIcon, ListItemText, Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GppGoodIcon from '@mui/icons-material/GppGood'; // For tips
import ReportProblemIcon from '@mui/icons-material/ReportProblem'; // For red flags
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // For what it is
import PolicyIcon from '@mui/icons-material/Policy'; // For rights/reporting
import Quiz from '../components/Quiz'; // Assuming Quiz component is in components folder

// --- Data Structure for Educational Content ---
// (This should be populated with researched information)
const educationalTopics = [
    {
        id: 'upi',
        title: 'UPI Scams',
        icon: <HelpOutlineIcon />,
        content: {
            description: "Scams involving India's Unified Payments Interface (UPI). Scammers trick users into sending money or revealing sensitive information.",
            redFlags: [
                "Receiving a 'Collect Request' or 'Payment Request' for money you didn't ask for (often disguised as receiving money).",
                "Being asked to scan a QR code to *receive* money (QR codes are only for *sending* money).",
                "Urgent calls/messages asking for UPI PIN or OTP for verification, refunds, or KYC updates.",
                "Pressure to install screen-sharing apps (like AnyDesk, TeamViewer) for 'customer support'.",
                "Fake UPI handles or VPA (Virtual Payment Addresses) mimicking legitimate businesses.",
            ],
            preventionTips: [
                "Never share your UPI PIN or OTP with anyone.",
                "Carefully check the details (name, amount) before approving *any* UPI request.",
                "Remember: You *never* need to enter your PIN to *receive* money.",
                "Be wary of unknown callers/senders asking for UPI transactions.",
                "Use official bank/UPI apps only and verify customer care numbers from official websites.",
                "Disable screen sharing permissions for unknown apps.",
            ],
            reporting: "Report immediately via your UPI app, bank, and on https://cybercrime.gov.in or call 1930."
        }
    },
    {
        id: 'fraudCalls',
        title: 'Fraud Calls (Vishing)',
        icon: <HelpOutlineIcon />,
        content: {
            description: "Scammers call pretending to be bank officials, government agents, company representatives, etc., to trick you into revealing personal info or sending money.",
            redFlags: [
                "Calls demanding immediate action or payment to avoid account blockage, service disconnection (like electricity), or legal trouble.",
                "Asking for sensitive details like OTP, CVV, passwords, Aadhaar number, or full bank account numbers.",
                "Threatening language or creating panic (e.g., 'your account is compromised', 'arrest warrant issued').",
                "Offering unbelievable deals, lottery wins, or job offers requiring an upfront fee.",
                "Calls asking for KYC verification over the phone demanding sensitive data or app installs.",
            ],
            preventionTips: [
                "Banks or legitimate institutions rarely ask for sensitive details over the phone.",
                "If suspicious, hang up and call the institution back using an official number from their website.",
                "Never share OTPs, PINs, or passwords.",
                "Be skeptical of unsolicited offers or threats.",
                "Verify KYC update requests through official channels (visiting branch, official website/app).",
            ],
            reporting: "Report suspicious numbers to your telecom provider, bank (if impersonated), and on https://cybercrime.gov.in or call 1930."
        }
    },
    {
        id: 'digitalArrest',
        title: 'Digital Arrest Scam',
        icon: <HelpOutlineIcon />,
        content: {
            description: "A scam where fraudsters impersonate police, CBI, customs, or other authorities. They claim you're involved in a crime (like money laundering, illegal parcel) and demand money to 'settle' the case or avoid immediate 'digital arrest' (often via video call intimidation).",
            redFlags: [
                "Unsolicited calls claiming to be from high-ranking police/government officials.",
                "Accusations of serious crimes you know nothing about.",
                "Demand for immediate payment into personal bank accounts or via specific methods to avoid arrest.",
                "Pressure to stay on the call (often video call) and follow instructions, sometimes involving downloading apps.",
                "Threats of freezing bank accounts or immediate legal action if you don't cooperate.",
                "Refusal to provide official documentation or case numbers that can be verified independently.",
            ],
            preventionTips: [
                "Legitimate authorities do *not* demand money over the phone to drop charges.",
                "Police/CBI procedures involve official notices, not sudden phone calls demanding payment.",
                "Never transfer money based on phone threats.",
                "Do not download apps or share screen access as instructed by unknown callers.",
                "Hang up and verify the claim independently by contacting your local police station (use official numbers, not provided by the caller).",
                "Do not share personal details like Aadhaar or bank information.",
            ],
            reporting: "Report immediately to your local police station and on https://cybercrime.gov.in or call 1930. Preserve the caller's number if possible."
        }
    },
    {
        id: 'password2fa',
        title: 'Password Security & 2FA',
        icon: <HelpOutlineIcon />,
        content: {
            description: "Protecting your online accounts starts with strong passwords and enabling Two-Factor Authentication (2FA).",
            redFlags: [ // Red flags indicating weak security
                "Using the same password for multiple websites.",
                "Using easy-to-guess passwords (name, birthday, 'password123').",
                "Not enabling 2FA/MFA where available.",
                "Sharing passwords with others.",
            ],
            preventionTips: [
                "Use strong, unique passwords for every important account (mix of upper/lowercase letters, numbers, symbols).",
                "Consider using a reputable password manager to generate and store complex passwords.",
                "Enable 2FA (Two-Factor Authentication) or MFA (Multi-Factor Authentication) whenever offered (SMS OTP, Authenticator App, Security Key). Authenticator apps are generally more secure than SMS.",
                "Change default passwords on new devices/services.",
                "Be cautious about where you enter your password (check for HTTPS, legitimate domain).",
            ],
            reporting: "If you suspect an account is compromised, change the password immediately, enable 2FA if not already done, and check account activity. Report phishing attempts if applicable."
        }
    },
    {
        id: 'generalTips',
        title: 'General Online Safety Rules',
        icon: <GppGoodIcon />, // Using tips icon here
        content: {
            description: "Basic rules of thumb to stay safer online.",
            // Using preventionTips directly here as it's a list of tips
            preventionTips: [
                "Think Before You Click: Be wary of links/attachments in unsolicited emails, SMS, or social media messages.",
                "Verify Before Trusting: Question urgent requests for money or information, even if they seem to come from friends or family (their account might be hacked). Verify through another channel (e.g., call them).",
                "Check Website URLs: Look for HTTPS and verify the domain name is correct (e.g., `bankofindia.co.in` not `bankoflndia.co.in` or `bankofindia.secure-site.com`).",
                "Keep Software Updated: Regularly update your operating system, browser, and antivirus software.",
                "Be Careful on Public Wi-Fi: Avoid accessing sensitive accounts (banking) on public networks unless using a trusted VPN.",
                "Review App Permissions: Check what permissions apps request (e.g., does a flashlight app need access to your contacts?).",
                "Don't Overshare Online: Be mindful of the personal information you share on social media."
            ],
            reporting: "Report scams and suspicious activity to relevant platforms and https://cybercrime.gov.in or 1930."
        }
    },
     {
        id: 'reportingCrime',
        title: 'Reporting Cyber Crime in India',
        icon: <PolicyIcon />, // Using policy icon
        content: {
            description: "Knowing how to report cybercrime is crucial for taking action and helping authorities.",
            keyPoints: [ // Using a different structure here for key info
                "National Helpline: Call **1930** for immediate assistance, especially for financial cyber fraud.",
                "Online Portal: Report all types of cybercrime (financial fraud, social media crimes, hacking, etc.) on the National Cyber Crime Reporting Portal: **https://cybercrime.gov.in/**",
                "What you'll need (generally): Details of the incident, screenshots, transaction IDs (if financial), suspect's number/ID (if known).",
                "Report Promptly: Especially for financial fraud, reporting quickly increases the chances of blocking funds.",
                "Local Police: You can also report cybercrimes at your local police station's cyber cell.",
            ],
            // No red flags or prevention tips needed here, focus is on action
        }
    },
    // Add more topics: Phishing, Online Shopping Scams, etc. following the same structure
];

// --- Quiz Questions Data ---
// (Should relate to the content above)
const quizQuestions = [
    {
        question: "If you receive a UPI request to *receive* money, what should you do?",
        options: [
            "Approve it immediately.",
            "Enter your UPI PIN to accept the money.",
            "Decline it; you don't need to approve requests or enter PIN to receive money.",
            "Share the request with friends."
        ],
        correctAnswer: "Decline it; you don't need to approve requests or enter PIN to receive money."
    },
    {
        question: "A caller claiming to be from your bank asks for your CVV number and OTP to 'unblock your card'. You should:",
        options: [
            "Provide the details quickly to fix the problem.",
            "Hang up and call the official bank helpline number found on their website.",
            "Ask them to send an email verification first.",
            "Give them only the CVV but not the OTP."
        ],
        correctAnswer: "Hang up and call the official bank helpline number found on their website."
    },
    {
        question: "What is a major red flag in a 'Digital Arrest' scam call?",
        options: [
            "The caller speaks politely.",
            "They provide a verifiable badge number.",
            "They demand immediate payment into a personal account to drop charges.",
            "They ask you to visit the nearest police station."
        ],
        correctAnswer: "They demand immediate payment into a personal account to drop charges."
    },
    {
        question: "What is the primary benefit of using a unique, strong password for each online account?",
        options: [
            "It makes login faster.",
            "If one account is compromised, others remain secure.",
            "It satisfies website requirements.",
            "You only need to remember one complex password."
        ],
        correctAnswer: "If one account is compromised, others remain secure."
    },
    {
        question: "What is the official national helpline number for reporting financial cyber fraud in India?",
        options: [
            "100",
            "1930",
            "1800-11-4000",
            "1091"
        ],
        correctAnswer: "1930"
    }
    // Add more questions
];


const EducationPage = () => {
    const [expanded, setExpanded] = useState(false);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={2} sx={{ p: { xs: 2, md: 4 } }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                    Online Safety & Scam Awareness (India)
                </Typography>
                <Typography paragraph sx={{ textAlign: 'center', mb: 4 }}>
                    Learn how to identify common online scams prevalent in India and adopt safer digital habits. Knowledge is your best defense!
                </Typography>

                {/* Educational Content Accordions */}
                {educationalTopics.map((topic) => (
                    <Accordion
                        key={topic.id}
                        expanded={expanded === topic.id}
                        onChange={handleAccordionChange(topic.id)}
                        sx={{ mb: 1 }} // Add margin between accordions
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${topic.id}-content`}
                            id={`${topic.id}-header`}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                {topic.icon && React.cloneElement(topic.icon, { sx: { mr: 1.5, color: 'primary.main' } })}
                                <Typography sx={{ fontWeight: 'medium' }}>{topic.title}</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails sx={{ bgcolor: 'grey.50' }}> {/* Slightly different background for details */}
                            {topic.content.description && (
                                <Typography paragraph variant="body1">{topic.content.description}</Typography>
                            )}

                            {topic.content.redFlags && topic.content.redFlags.length > 0 && (
                                <>
                                    <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1, color: 'error.main' }}>
                                        <ReportProblemIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} fontSize="small" /> Red Flags
                                    </Typography>
                                    <List dense disablePadding>
                                        {topic.content.redFlags.map((flag, index) => (
                                            <ListItem key={index} sx={{ pl: 2 }}>
                                                <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5 }}>
                                                    <ReportProblemIcon fontSize="small" color="error" />
                                                </ListItemIcon>
                                                <ListItemText primary={flag} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </>
                            )}

                            {topic.content.preventionTips && topic.content.preventionTips.length > 0 && (
                                <>
                                    <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1, color: 'success.main' }}>
                                        <GppGoodIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} fontSize="small" /> Prevention Tips / Rules
                                    </Typography>
                                    <List dense disablePadding>
                                        {topic.content.preventionTips.map((tip, index) => (
                                            <ListItem key={index} sx={{ pl: 2 }}>
                                                <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5 }}>
                                                    <GppGoodIcon fontSize="small" color="success" />
                                                </ListItemIcon>
                                                <ListItemText primary={tip} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </>
                            )}

                             {topic.content.keyPoints && topic.content.keyPoints.length > 0 && (
                                <>
                                    <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1, color: 'primary.main' }}>
                                        <PolicyIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} fontSize="small" /> Key Information
                                    </Typography>
                                    <List dense disablePadding>
                                        {topic.content.keyPoints.map((point, index) => (
                                            <ListItem key={index} sx={{ pl: 2 }}>
                                                <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5 }}>
                                                    <PolicyIcon fontSize="small" color="primary" />
                                                </ListItemIcon>
                                                {/* Use dangerouslySetInnerHTML for bolding - use with trusted content ONLY */}
                                                <ListItemText primary={<span dangerouslySetInnerHTML={{ __html: point }} />} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </>
                            )}


                            {topic.content.reporting && (
                                 <Alert severity="info" sx={{ mt: 3 }}>
                                    <Typography variant="body2" component="div">
                                        <strong>Reporting:</strong> <span dangerouslySetInnerHTML={{ __html: topic.content.reporting }} />
                                        {/* Use dangerouslySetInnerHTML ONLY if your source text contains safe HTML like <b> */}
                                        {/* Otherwise, just use: {topic.content.reporting} */}
                                    </Typography>
                                </Alert>
                            )}
                        </AccordionDetails>
                    </Accordion>
                ))}

                {/* Quiz Section */}
                <Box sx={{ mt: 5 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center' }}>
                        Test Your Knowledge!
                    </Typography>
                    <Quiz questions={quizQuestions} /> {/* Pass questions to the Quiz component */}
                </Box>

            </Paper>
        </Container>
    );
};

export default EducationPage;
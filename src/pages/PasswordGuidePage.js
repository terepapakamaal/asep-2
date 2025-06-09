import React, { useState, useEffect, useCallback } from 'react';
import {
    Container, TextField, Button, Typography, Paper, Box, Grid,
    Slider, FormControlLabel, Checkbox, IconButton, LinearProgress, Alert,
    List, ListItem, ListItemText, ListItemSecondaryAction,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Tabs, Tab, Tooltip, Chip
} from '@mui/material';
import {
    Lock as LockIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    ContentCopy as ContentCopyIcon,
    CheckCircleOutline as CheckCircleOutlineIcon,
    Language as LanguageIcon,
    CreditCard as CreditCardIcon,
    AccountCircle as AccountCircleIcon,
    Email as EmailIcon,
    VpnKey as VpnKeyIcon,
    InfoOutlined as InfoOutlinedIcon
} from '@mui/icons-material';

// --- Helper Function to Generate IDs (for demo purposes) ---
const generateId = () => Date.now().toString() + Math.random().toString(36).substring(2, 9);

const PasswordManagerAndChecker = () => {
    // --- States for Password Strength Checker ---
    const [passwordToCheck, setPasswordToCheck] = useState('');
    const [strength, setStrength] = useState({ score: 0, text: '', color: 'error', timeToCrack: '', meetsCriteria: [] });

    // --- States for Password Generator ---
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [passwordLength, setPasswordLength] = useState(12);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [copiedGeneratedPassword, setCopiedGeneratedPassword] = useState(false);

    // --- States for Website Credentials ---
    const [websiteCredentials, setWebsiteCredentials] = useState([]);
    const [currentWebsiteUrl, setCurrentWebsiteUrl] = useState('');
    const [currentUsername, setCurrentUsername] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [editingWebsiteId, setEditingWebsiteId] = useState(null);
    const [showWebsitePasswordInForm, setShowWebsitePasswordInForm] = useState(false);

    // --- States for Card Credentials ---
    const [cardCredentials, setCardCredentials] = useState([]);
    const [currentCardholderName, setCurrentCardholderName] = useState('');
    const [currentCardNumber, setCurrentCardNumber] = useState('');
    const [currentExpiryDate, setCurrentExpiryDate] = useState('');
    const [currentCardType, setCurrentCardType] = useState('');
    const [editingCardId, setEditingCardId] = useState(null);

    // --- General UI States ---
    const [currentTab, setCurrentTab] = useState(0);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState({ id: null, type: '' });
    const [visiblePasswordsInList, setVisiblePasswordsInList] = useState({});

    // --- Load data from localStorage ---
    useEffect(() => {
        try {
            const storedWebsites = localStorage.getItem('guardianOneWebsiteCredentials');
            if (storedWebsites) setWebsiteCredentials(JSON.parse(storedWebsites));
            const storedCards = localStorage.getItem('guardianOneCardCredentials');
            if (storedCards) setCardCredentials(JSON.parse(storedCards));
        } catch (error) {
            console.error("Error loading data from localStorage:", error);
            // Optionally clear corrupted data
            // localStorage.removeItem('guardianOneWebsiteCredentials');
            // localStorage.removeItem('guardianOneCardCredentials');
        }
    }, []);

    // --- Save data to localStorage ---
    useEffect(() => {
        localStorage.setItem('guardianOneWebsiteCredentials', JSON.stringify(websiteCredentials));
    }, [websiteCredentials]);
    useEffect(() => {
        localStorage.setItem('guardianOneCardCredentials', JSON.stringify(cardCredentials));
    }, [cardCredentials]);

    // --- Password Strength Calculation ---
    const calculatePasswordStrength = useCallback(() => {
        const pass = passwordToCheck;
        if (!pass) {
            setStrength({ score: 0, text: '', color: 'grey', timeToCrack: '', meetsCriteria: [] });
            return;
        }
        let score = 0; let charPoolSize = 0; let criteriaMet = [];
        if (pass.length >= 8) { score += 25; criteriaMet.push("8+ Chars"); } else if (pass.length > 0) score -= 10;
        if (pass.length >= 12) { score += 15; criteriaMet.push("12+ Chars"); }
        if (/[a-z]/.test(pass)) { score += 10; charPoolSize += 26; criteriaMet.push("abc"); }
        if (/[A-Z]/.test(pass)) { score += 15; charPoolSize += 26; criteriaMet.push("ABC"); }
        if (/\d/.test(pass)) { score += 15; charPoolSize += 10; criteriaMet.push("123"); }
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?~`]/.test(pass)) { score += 20; charPoolSize += 33; criteriaMet.push("#$&"); }
        score = Math.max(0, score);
        let timeToCrackText = 'Instantly';
        if (pass.length > 0 && charPoolSize > 0) {
            const entropy = pass.length * Math.log2(charPoolSize);
            const guessesPerSecond = 1e9;
            const secondsToCrack = Math.pow(2, entropy) / guessesPerSecond;
            if (secondsToCrack < 1) timeToCrackText = '<1s';
            else if (secondsToCrack < 60) timeToCrackText = `~${Math.round(secondsToCrack)}s`;
            else if (secondsToCrack < 3600) timeToCrackText = `~${Math.round(secondsToCrack / 60)}m`;
            else if (secondsToCrack < 86400) timeToCrackText = `~${Math.round(secondsToCrack / 3600)}h`;
            else if (secondsToCrack < 2.628e+6) timeToCrackText = `~${Math.round(secondsToCrack / 86400)}d`;
            else if (secondsToCrack < 3.154e+7) timeToCrackText = `~${Math.round(secondsToCrack / 2.628e+6)}mo`;
            else if (secondsToCrack < 3.154e+9) timeToCrackText = `~${Math.round(secondsToCrack / 3.154e+7)}y`;
            else timeToCrackText = "Centuries+";
            if (pass.length < 4) timeToCrackText = 'Instantly';
        }
        let text = 'Very Weak'; let color = 'error';
        const scoreNormalized = Math.min(100, score);
        if (scoreNormalized >= 85) { text = 'Very Strong'; color = 'success'; }
        else if (scoreNormalized >= 70) { text = 'Strong'; color = 'success'; }
        else if (scoreNormalized >= 50) { text = 'Good'; color = 'warning'; }
        else if (scoreNormalized >= 25) { text = 'Fair'; color = 'warning'; }
        else if (pass.length === 0) { text = ''; color = 'grey'; }
        setStrength({ score: scoreNormalized, text, color, timeToCrack: timeToCrackText, meetsCriteria: criteriaMet });
    }, [passwordToCheck]);

    useEffect(() => { calculatePasswordStrength(); }, [passwordToCheck, calculatePasswordStrength]);

    // --- Password Generator Logic ---
    const handleGeneratePassword = () => {
        let charPool = '';
        if (includeLowercase) charPool += 'abcdefghijklmnopqrstuvwxyz';
        if (includeUppercase) charPool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeNumbers) charPool += '0123456789';
        if (includeSymbols) charPool += '!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~`';
        if (charPool === '') { setGeneratedPassword('Error: Select character types.'); return; }
        let newPassword = '';
        for (let i = 0; i < passwordLength; i++) { newPassword += charPool.charAt(Math.floor(Math.random() * charPool.length)); }
        setGeneratedPassword(newPassword);
        setCopiedGeneratedPassword(false);
    };
    const handleCopyGeneratedPassword = () => { navigator.clipboard.writeText(generatedPassword).then(() => { setCopiedGeneratedPassword(true); setTimeout(() => setCopiedGeneratedPassword(false), 2000); }); };
    const handleUseGeneratedPassword = () => { setCurrentPassword(generatedPassword); setPasswordToCheck(generatedPassword); };

    // --- Website Credential CRUD ---
    const resetWebsiteForm = () => { setEditingWebsiteId(null); setCurrentWebsiteUrl(''); setCurrentUsername(''); setCurrentEmail(''); setCurrentPassword(''); setGeneratedPassword(''); setPasswordToCheck(''); setShowWebsitePasswordInForm(false); };
    const handleAddOrUpdateWebsite = () => {
        if (!currentWebsiteUrl || !currentUsername || !currentPassword) { alert('Website URL, Username, and Password are required.'); return; }
        if (editingWebsiteId) {
            setWebsiteCredentials(websiteCredentials.map(cred => cred.id === editingWebsiteId ? { ...cred, url: currentWebsiteUrl, username: currentUsername, email: currentEmail, password: currentPassword } : cred ));
        } else {
            setWebsiteCredentials(prev => [...prev, { id: generateId(), url: currentWebsiteUrl, username: currentUsername, email: currentEmail, password: currentPassword }]);
        }
        resetWebsiteForm();
    };
    const handleEditWebsite = (cred) => { setEditingWebsiteId(cred.id); setCurrentWebsiteUrl(cred.url); setCurrentUsername(cred.username); setCurrentEmail(cred.email || ''); setCurrentPassword(cred.password); setPasswordToCheck(cred.password); setShowWebsitePasswordInForm(false); setCurrentTab(0); };
    const handleDeleteWebsite = (id) => { setItemToDelete({ id, type: 'website' }); setDeleteDialogOpen(true); };

    // --- Card Credential CRUD ---
    const resetCardForm = () => { setEditingCardId(null); setCurrentCardholderName(''); setCurrentCardNumber(''); setCurrentExpiryDate(''); setCurrentCardType(''); };
    const handleAddOrUpdateCard = () => {
        if (!currentCardholderName || !currentCardNumber || !currentExpiryDate) { alert('Cardholder Name, Card Number, and Expiry Date are required.'); return; }
        if (editingCardId) {
            setCardCredentials(cardCredentials.map(card => card.id === editingCardId ? { ...card, name: currentCardholderName, number: currentCardNumber, expiry: currentExpiryDate, type: currentCardType } : card ));
        } else {
            setCardCredentials(prev => [...prev, { id: generateId(), name: currentCardholderName, number: currentCardNumber, expiry: currentExpiryDate, type: currentCardType }]);
        }
        resetCardForm();
    };
    const handleEditCard = (card) => { setEditingCardId(card.id); setCurrentCardholderName(card.name); setCurrentCardNumber(card.number); setCurrentExpiryDate(card.expiry); setCurrentCardType(card.type || ''); setCurrentTab(1);};
    const handleDeleteCard = (id) => { setItemToDelete({ id, type: 'card' }); setDeleteDialogOpen(true); };

    // --- Delete Confirmation & Tab ---
    const confirmDelete = () => {
        if (itemToDelete.type === 'website') setWebsiteCredentials(prev => prev.filter(cred => cred.id !== itemToDelete.id));
        else if (itemToDelete.type === 'card') setCardCredentials(prev => prev.filter(card => card.id !== itemToDelete.id));
        setDeleteDialogOpen(false); setItemToDelete({ id: null, type: '' });
    };
    const togglePasswordVisibilityInList = (id) => setVisiblePasswordsInList(prev => ({ ...prev, [id]: !prev[id] }));
    const handleTabChange = (event, newValue) => { setCurrentTab(newValue); if(!editingWebsiteId) resetWebsiteForm(); if(!editingCardId) resetCardForm(); };

    // --- Render Functions ---
    const renderStrengthChecker = () => (
        <Paper variant="outlined" sx={{ mb: 4, p: {xs:1.5, sm:2.5} }}>
            <Typography variant="h6" component="h3" gutterBottom>Check Password Strength</Typography>
            <TextField label="Enter Password to Check" type="password" variant="outlined" fullWidth value={passwordToCheck} onChange={(e) => setPasswordToCheck(e.target.value)} sx={{ mb: 1.5 }} autoComplete="new-password" />
            {passwordToCheck && (
                <Box>
                    <LinearProgress variant="determinate" value={strength.score} color={strength.color || 'grey'} sx={{ height: 10, borderRadius: 1, mb: 1 }} />
                    <Grid container spacing={1} alignItems="center" justifyContent="space-between" sx={{mb:1}}>
                        <Grid item><Typography variant="body1" component="span" color={`${strength.color || 'text.secondary'}.main`} fontWeight="medium">Strength: {strength.text || 'Enter password'}</Typography></Grid>
                        <Grid item><Typography variant="caption" color="text.secondary">Crack Time (est.): {strength.timeToCrack || '-'}</Typography></Grid>
                    </Grid>
                    {strength.meetsCriteria.length > 0 && (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5, mb:1}}>
                            {strength.meetsCriteria.map(crit => ( <Chip key={crit} icon={<CheckCircleOutlineIcon fontSize="small"/>} label={crit} size="small" color="success" variant="outlined"/> ))}
                        </Box>
                    )}
                     {(strength.score < 70 && passwordToCheck.length > 0) && (<Alert severity="info" icon={<InfoOutlinedIcon fontSize="inherit"/>} sx={{fontSize: '0.8rem'}}>Combine uppercase, lowercase, numbers, symbols, and aim for 12+ characters for better security.</Alert>)}
                </Box>
            )}
        </Paper>
    );

    const renderGenerator = () => (
        <Paper variant="outlined" sx={{ mb: 4, p: {xs:1.5, sm:2.5} }}>
            <Typography variant="h6" component="h3" gutterBottom>Generate Secure Password</Typography>
            <Grid container spacing={{xs:1, sm:2}} alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={12} sm={5} md={4}><Typography gutterBottom id="pw-len-slider">Length: {passwordLength}</Typography><Slider value={passwordLength} onChange={(e, val) => setPasswordLength(val)} aria-labelledby="pw-len-slider" valueLabelDisplay="auto" step={1} marks min={8} max={32} /></Grid>
                <Grid item xs={12} sm={7} md={8}><Grid container spacing={0} justifyContent="space-around"><Grid item><FormControlLabel control={<Checkbox size="small" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />} label="ABC" /></Grid><Grid item><FormControlLabel control={<Checkbox size="small" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} />} label="abc" /></Grid><Grid item><FormControlLabel control={<Checkbox size="small" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />} label="123" /></Grid><Grid item><FormControlLabel control={<Checkbox size="small" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />} label="#$&" /></Grid></Grid></Grid>
            </Grid>
            <Button variant="contained" color="secondary" onClick={handleGeneratePassword} fullWidth sx={{ mb: 1.5, py:1 }}>Generate New Password</Button>
            {generatedPassword && !generatedPassword.startsWith('Error:') && (
                <Paper variant="filled" sx={{ p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body1" component="span" sx={{ fontFamily: 'monospace', wordBreak: 'break-all', mr: 1, fontSize:'1.1rem' }}>{generatedPassword}</Typography>
                    <Tooltip title={copiedGeneratedPassword ? "Copied!" : "Copy Password"}><IconButton onClick={handleCopyGeneratedPassword} color={copiedGeneratedPassword ? "success" : "primary"} size="small">{copiedGeneratedPassword ? <CheckCircleOutlineIcon /> : <ContentCopyIcon />}</IconButton></Tooltip>
                </Paper>
            )}
            {generatedPassword.startsWith('Error:') && (<Alert severity="error" sx={{mt:1}}>{generatedPassword}</Alert>)}
        </Paper>
    );

    const renderWebsiteForm = () => (
        <Paper variant="outlined" sx={{ mt: 2, p:{xs:1.5, sm:2.5} }}>
            <Typography variant="h6" gutterBottom>{editingWebsiteId ? 'Edit Website Login' : 'Add New Website Login'}</Typography>
            <TextField label="Website URL" fullWidth margin="dense" value={currentWebsiteUrl} onChange={e => setCurrentWebsiteUrl(e.target.value)} InputProps={{startAdornment: <LanguageIcon sx={{mr:1, color:'action.active'}}/>}}/>
            <TextField label="Username" fullWidth margin="dense" value={currentUsername} onChange={e => setCurrentUsername(e.target.value)} InputProps={{startAdornment: <AccountCircleIcon sx={{mr:1, color:'action.active'}}/>}}/>
            <TextField label="Email (Optional)" type="email" fullWidth margin="dense" value={currentEmail} onChange={e => setCurrentEmail(e.target.value)} InputProps={{startAdornment: <EmailIcon sx={{mr:1, color:'action.active'}}/>}}/>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs><TextField label="Password" type={showWebsitePasswordInForm ? 'text' : 'password'} fullWidth margin="dense" value={currentPassword} onChange={e => {setCurrentPassword(e.target.value); setPasswordToCheck(e.target.value);}} InputProps={{ startAdornment: <VpnKeyIcon sx={{mr:1, color:'action.active'}}/>, endAdornment: (<IconButton onClick={() => setShowWebsitePasswordInForm(!showWebsitePasswordInForm)} edge="end">{showWebsitePasswordInForm ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton>)}}/></Grid>
                {(generatedPassword && !currentPassword && !editingWebsiteId) && (<Grid item> <Button onClick={handleUseGeneratedPassword} variant="text" size="small" sx={{mb: '4px', whiteSpace: 'nowrap'}}>Use Generated</Button> </Grid>)}
            </Grid>
            {(currentPassword && passwordToCheck === currentPassword && strength.text) && (<Box sx={{mt:0.5, mb:1}}><LinearProgress variant="determinate" value={strength.score} color={strength.color} sx={{ height: 6, borderRadius: 1, mb: 0.5 }} /><Typography variant="caption" color={`${strength.color}.main`}>Strength: {strength.text}</Typography><Typography variant="caption" color="text.secondary" sx={{ml:1}}>Crack Time: {strength.timeToCrack}</Typography></Box>)}
            <Box sx={{mt:2, display:'flex', gap:1}}><Button startIcon={<AddIcon />} variant="contained" onClick={handleAddOrUpdateWebsite}>{editingWebsiteId ? 'Save Changes' : 'Add Login'}</Button>{editingWebsiteId && (<Button variant="outlined" onClick={resetWebsiteForm}>Cancel Edit</Button>)}</Box>
        </Paper>
    );

    const renderCardForm = () => (
        <Paper variant="outlined" sx={{ mt: 2, p:{xs:1.5, sm:2.5} }}>
            <Typography variant="h6" gutterBottom>{editingCardId ? 'Edit Payment Card' : 'Add New Payment Card'}</Typography>
            <TextField label="Cardholder Name" fullWidth margin="dense" value={currentCardholderName} onChange={e => setCurrentCardholderName(e.target.value)} InputProps={{startAdornment: <AccountCircleIcon sx={{mr:1, color:'action.active'}}/>}}/>
            <TextField label="Card Number (No Spaces)" fullWidth margin="dense" value={currentCardNumber} onChange={e => setCurrentCardNumber(e.target.value.replace(/\s/g, '').slice(0,19))} inputProps={{ maxLength: 19 }} InputProps={{startAdornment: <CreditCardIcon sx={{mr:1, color:'action.active'}}/>}}/>
            <Grid container spacing={2}><Grid item xs={6} sm={4}><TextField label="Expiry (MM/YY)" placeholder="MM/YY" fullWidth margin="dense" value={currentExpiryDate} onChange={e => setCurrentExpiryDate(e.target.value.replace(/[^0-9/]/g, '').slice(0,5))} inputProps={{ maxLength: 5 }} /></Grid><Grid item xs={6} sm={8}><TextField label="Card Type (Optional)" fullWidth margin="dense" value={currentCardType} onChange={e => setCurrentCardType(e.target.value)} /></Grid></Grid>
            <Alert severity="info" sx={{mt:1.5, mb:1.5, fontSize:'0.8rem'}}>Reminder: For security reasons, CVV/PIN numbers are never stored.</Alert>
            <Box sx={{mt:2, display:'flex', gap:1}}><Button startIcon={<AddIcon />} variant="contained" onClick={handleAddOrUpdateCard}>{editingCardId ? 'Save Changes' : 'Add Card'}</Button>{editingCardId && (<Button variant="outlined" onClick={resetCardForm}>Cancel Edit</Button>)}</Box>
        </Paper>
    );

    // --- Main Return ---
    return (
        <Container maxWidth="lg" sx={{ mt: {xs:2, sm:3, md:4}, mb: 4 }}>
            <Paper elevation={2} sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LockIcon color="primary" sx={{ fontSize: {xs: 28, sm: 36}, mr: 1.5 }} />
                    <Typography variant="h4" component="h1" sx={{fontSize: {xs: '1.7rem', sm: '2rem', md:'2.125rem'}}}>
                        Password & Credential Hub <Typography variant="caption" component="sup">(Demo)</Typography>
                    </Typography>
                </Box>
                <Alert severity="warning" sx={{ mb: 3 }}>
                    <strong>Important:</strong> This is for demonstration purposes only. Data is stored in your browser's local storage and is <strong>NOT SECURE</strong> for real passwords or financial details.
                </Alert>

                {renderStrengthChecker()}
                {renderGenerator()}

                <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3, mb: 2 }}>
                    <Tabs value={currentTab} onChange={handleTabChange} aria-label="Credential type tabs" variant="fullWidth" centered>
                        <Tab label="Website Logins" icon={<LanguageIcon/>} iconPosition="start" />
                        <Tab label="Payment Cards" icon={<CreditCardIcon/>} iconPosition="start" />
                    </Tabs>
                </Box>

                {currentTab === 0 && (
                    <Box>
                        {renderWebsiteForm()}
                        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Stored Website Logins</Typography>
                        {websiteCredentials.length === 0 && <Typography sx={{textAlign:'center', color: 'text.secondary', p:2}}>No website logins saved yet.</Typography>}
                        <List dense sx={{bgcolor: 'background.paper', borderRadius:1}}>
                            {websiteCredentials.map(cred => (
                                <React.Fragment key={cred.id}>
                                    <ListItem divider sx={{flexWrap: 'wrap', py:1.5, '&:last-child .MuiDivider-root': {display:'none'} }}>
                                        <ListItemText primary={<Typography variant="subtitle1" fontWeight={500} sx={{wordBreak:'break-all'}}>{cred.url}</Typography>}
                                            secondary={<><Typography component="span" variant="body2">User: {cred.username}</Typography>{cred.email && <Typography component="span" variant="body2" sx={{display:'block'}}>Email: {cred.email}</Typography>}<Typography component="span" variant="body2" sx={{display:'block'}}>Pass: {visiblePasswordsInList[cred.id] ? cred.password : '••••••••'}</Typography></>}
                                            sx={{pr: {xs:0, sm: '110px'}, mb:{xs:1,sm:0}}} />
                                        <ListItemSecondaryAction sx={{position: {xs: 'static', sm: 'absolute'}, right: {sm:16}, top: {sm:'50%'}, transform: {sm:'translateY(-50%)'}, display:'flex', justifyContent:{xs:'flex-start',sm:'flex-end'}, width:{xs:'100%',sm:'auto'}}}>
                                            <Tooltip title={visiblePasswordsInList[cred.id] ? "Hide" : "Show"}><IconButton size="small" onClick={() => togglePasswordVisibilityInList(cred.id)}>{visiblePasswordsInList[cred.id] ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton></Tooltip>
                                            <Tooltip title="Edit"><IconButton size="small" onClick={() => handleEditWebsite(cred)} sx={{ml:0.5}}><EditIcon /></IconButton></Tooltip>
                                            <Tooltip title="Delete"><IconButton size="small" onClick={() => handleDeleteWebsite(cred.id)} sx={{ml:0.5}}><DeleteIcon color="error"/></IconButton></Tooltip>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </React.Fragment>
                            ))}
                        </List>
                    </Box>
                )}
                {currentTab === 1 && ( <Box>{renderCardForm()}<Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Stored Payment Cards</Typography>{cardCredentials.length === 0 && <Typography sx={{textAlign:'center', color: 'text.secondary', p:2}}>No payment cards saved yet.</Typography>}<List dense sx={{bgcolor: 'background.paper', borderRadius:1}}>{cardCredentials.map(card => (<React.Fragment key={card.id}><ListItem divider sx={{flexWrap: 'wrap', py:1.5, '&:last-child .MuiDivider-root': {display:'none'} }}><ListItemText primary={<Typography variant="subtitle1" fontWeight={500}>{card.name}</Typography>} secondary={<><Typography component="span" variant="body2">Card: ···· ···· ···· {card.number.slice(-4)}</Typography><br />Expiry: {card.expiry}{card.type && <><br />Type: {card.type}</>}</>} sx={{pr: {xs:0, sm: '80px'}, mb:{xs:1,sm:0}}} /><ListItemSecondaryAction sx={{position: {xs: 'static', sm: 'absolute'}, right: {sm:16}, top: {sm:'50%'}, transform: {sm:'translateY(-50%)'}, display:'flex', justifyContent:{xs:'flex-start',sm:'flex-end'}, width:{xs:'100%',sm:'auto'}}}><Tooltip title="Edit"><IconButton size="small" onClick={() => handleEditCard(card)}><EditIcon /></IconButton></Tooltip><Tooltip title="Delete"><IconButton size="small" onClick={() => handleDeleteCard(card.id)} sx={{ml:0.5}}><DeleteIcon color="error"/></IconButton></Tooltip></ListItemSecondaryAction></ListItem></React.Fragment>))}</List></Box> )}

                <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} aria-labelledby="delete-dialog-title"><DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle><DialogContent><DialogContentText>Are you sure you want to delete this credential? This action cannot be undone.</DialogContentText></DialogContent><DialogActions><Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button><Button onClick={confirmDelete} color="error" autoFocus>Delete</Button></DialogActions></Dialog>
            </Paper>
        </Container>
    );
};

export default PasswordManagerAndChecker;

// Chip component for strength criteria (optional, if you want to import it separately)
// import Chip from '@mui/material/Chip';
import { Accordion, TextareaAutosize, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Divider, Dialog, Card, Badge, AccordionDetails, Typography, AccordionSummary, Grid, makeStyles, Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import './App.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paperone: {
        textAlign: "center",
        padding: theme.spacing(2),
        maxHeight: "460px",
        border: '1px solid rgba(0, 0, 0, 190)',
        marginTop: '-2%'
    },
    papertwo: {
        padding: theme.spacing(2),
        textAlign: "center",
        marginTop: '-2%',
        maxHeight: "460px",
        border: '1px solid rgba(0, 0, 0, 190)'
    },
    badge: {
        marginLeft: "1%",
        padding: "3px",
        borderRadius: '4px',
        display: "absolute",
        backgroundColor: "#187ad6",
        color: "white"
    },
    control: {
        padding: theme.spacing(4),
    },
    button: {
        borderRadius: "50px",
        color: "white",
        backgroundColor: "#30a69a",
        textTransform: "none",
        marginTop: "10px"
    },
    img: {
        height: "70px",
        width: "60px"
    }
}));

function Pageone() {

    const classes = useStyles();
    const [openpopup, setOpenpopup] = React.useState(false);
    const [header, setHeader] = React.useState();
    const [content, setContent] = React.useState();
    const [buttonclick, setButtonclick] = React.useState(false);
    const [listdetails, setListDetails] = React.useState([]);
    const [addlist, setAddlist] = React.useState([]);

    const openPopup = () => {
        setOpenpopup(true);
    }

    const closePopup = () => {
        setOpenpopup(false);
    }

    const addDetails = () => {
        setHeader(header);
        setContent(content);
        setButtonclick(true);
        addlist.push({ 'header': header, 'content': content })
    }

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        }

        fetch("https://api.github.com/users", requestOptions)
            .then(async res => {
                const data = await res.json();
                setListDetails(data);
            })
    }, [1000])

    const listview = () => {
        console.log("enter into listview")
        return (
            addlist.map((addlists, i) => (
                <Accordion expanded style={{ backgroundColor: "#525659", color: "white" }}>
                    <AccordionSummary>
                        <Typography>{addlists.header}</Typography>
                    </AccordionSummary><Divider />
                    <AccordionDetails>
                        <Typography>
                            {addlists.content}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))
        );
    }

    return (
        <div>
            <Grid container className={classes.control}>

            {/*-------------------------- API Card ----------------------------- */}

                <Grid item xs style={{ padding: "10px" }}>
                    <Badge className={classes.badge}> Group 1 </Badge>
                    <Card className={classes.paperone}>
                        <div style={{ overflowY: 'scroll', padding: '20px', height: '380px' }}>
                            {listdetails.map((list, i) => (
                                <Accordion expanded style={{ backgroundColor: "#525659", color: "white" }}>
                                    <AccordionSummary>
                                        <Typography>{list.login}</Typography>
                                    </AccordionSummary><Divider />
                                    <AccordionDetails>
                                        <img className={classes.img} src={list.avatar_url} />
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </div>
                        <Button className={classes.button}>Add</Button>
                    </Card>
                </Grid>

            {/* ---------------------- Add Details card ------------------------*/}

                <Grid item xs style={{ padding: "10px" }}>
                    <Badge className={classes.badge}> Group 2</Badge>
                    <Card className={classes.papertwo}>
                        <div style={{ overflowY: 'scroll', padding: '20px', height: '380px' }}>
                            <Accordion expanded style={{ backgroundColor: "#525659", color: "white" }}>
                                <AccordionSummary>
                                    <Typography>Header</Typography>
                                </AccordionSummary><Divider />
                                <AccordionDetails>
                                    <Typography>
                                        Some quick example text to build on the card title and make up the bulk of the card's content.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            {buttonclick && listview()}
                        </div>
                        <Button className={classes.button} onClick={openPopup}>click to add details</Button>
                    </Card>
                </Grid>
            </Grid>

        {/* ----------------------------- pop up ------------------------------ */}
            <div>
                <Dialog open={openpopup} onClose={closePopup} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add details</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="header"
                            label="Header"
                            type="email"
                            onChange={e => { setHeader(e.target.value) }}
                            fullWidth
                        />
                        <TextField
                           id="content"
                           multiline
                           placeholder="enter text"
                           rows={4}
                           variant="outlined"
                           fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={addDetails}>
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}


export default Pageone;
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Tooltip, Grid, InputLabel, Select, MenuItem, Button, Modal, Box, Typography } from '@mui/material';
import { changeArtifactPropierties, selectDiagramPropierties } from './modelerSlice';


export default function PropertiesDrawer(props) {
    const { selectedItem, updateSelectedLabel } = props;
    const dispatch = useDispatch();
    const diagramPropierties = useSelector(selectDiagramPropierties);
    const name = diagramPropierties[selectedItem] ? diagramPropierties[selectedItem].name : '';
    const desc = diagramPropierties[selectedItem] ? diagramPropierties[selectedItem].desc : '';
    const restrictions = diagramPropierties[selectedItem] ? diagramPropierties[selectedItem].restrictions : '';
    const criteria = diagramPropierties[selectedItem] ? diagramPropierties[selectedItem].criteria : '';
    const priority = diagramPropierties[selectedItem] ? diagramPropierties[selectedItem].priority : '';
    const points = diagramPropierties[selectedItem] ? diagramPropierties[selectedItem].points : '';
    const anchor =  selectedItem == '' ? false : true;

    const onChangeProp = (propierty) => (e) => {
        dispatch(changeArtifactPropierties({
            id: selectedItem,
            propierty: propierty,
            value: e.target.value
        }));
        if(propierty == 'name') updateSelectedLabel.f(e.target.value);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const boxStyle = {
        backgroundColor: 'primary.dark',
        border: 2
    }

    const boxStyleEven = {
        backgroundColor: 'primary.light',
        border: 2
    }

    const boxStyleOdd = {
        backgroundColor: 'primary.main',
        border: 2
    }

    const titleStyle = {color: 'white', marginLeft:5, fontWeight: 'bold'}
    const valueStyle = { marginLeft:5, fontSize:18}

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Grid container spacing={0} sx={boxStyle}>
                    <Grid item xs={4}>
                        <img src='http://127.0.0.1:8000/static/img/logo.gif' />
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container spacing={0}>
                            <Grid item xs={12}><h3 style={{color: 'white'}}>Historia de usuario</h3></Grid>
                            <Grid item xs={6} sx={boxStyleEven}><h3 style={titleStyle}>Código:</h3></Grid>
                            <Grid item xs={6} sx={boxStyleEven}><span style={valueStyle}>{selectedItem}</span></Grid>
                            <Grid item xs={6} sx={boxStyleOdd}><h3 style={titleStyle}>Prioridad:</h3></Grid>
                            <Grid item xs={6} sx={boxStyleOdd}><span style={valueStyle}>{priority}</span></Grid>
                            <Grid item xs={6} sx={boxStyleEven}><h3 style={titleStyle}>Puntos:</h3></Grid>
                            <Grid item xs={6} sx={boxStyleEven}><span style={valueStyle}>{points}</span></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={boxStyleOdd}>
                        <h3 style={titleStyle}>Descripción:</h3>
                        <span style={valueStyle}>Como -rol- quiero {name} de tal forma que {desc}</span>
                    </Grid>
                    <Grid item xs={12} sx={boxStyleEven}>
                        <h3 style={titleStyle}>Restricciones:</h3>
                        <span style={valueStyle}>{restrictions}</span>
                    </Grid>
                    <Grid item xs={12} sx={boxStyleOdd}>
                        <h3 style={titleStyle}>Criterios de aceptación:</h3>
                        <span style={valueStyle}>{criteria}</span>
                    </Grid>
                </Grid>
            </Modal>
            <Drawer
                anchor={'bottom'}
                open={anchor}
                variant="persistent"
            >
                <Grid container spacing={0}>
                    <Grid item xs={9}>

                    </Grid>
                    <Grid item xs={3} >
                        <FormControl fullWidth sx={{ m: 1, width:"97%"}} variant="outlined">
                            <Button variant="contained" onClick={handleOpen}>Previsualizar</Button>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <FormControl fullWidth sx={{ m: 1}} variant="outlined">
                            <Tooltip title="Normalmente un verbo en infinitivo" placement="top">
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Nombre"
                                    value={name}
                                    onChange={onChangeProp("name")}
                                />
                            </Tooltip>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl sx={{ m: 1, width:"97%" }} variant="outlined">
                            <InputLabel id="priority-label">Prioridad</InputLabel>
                            <Tooltip title="Normalmente un numero de la serie fibonacci" placement="top">
                                <Select
                                    labelId="priority-label"
                                    value={priority}
                                    label="Prioridad"
                                    onChange={onChangeProp("priority")}
                                >
                                    <MenuItem value={'Baja'}>Baja</MenuItem>
                                    <MenuItem value={'Media'}>Media</MenuItem>
                                    <MenuItem value={'Alta'}>Alta</MenuItem>
                                </Select>
                            </Tooltip>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl sx={{ m: 1, width:"97%" }} variant="outlined">
                            <InputLabel id="points-label">Puntos</InputLabel>
                            <Tooltip title="Normalmente un numero de la serie fibonacci" placement="top">
                                <Select
                                    labelId="points-label"
                                    value={points}
                                    label="Puntos"
                                    onChange={onChangeProp("points")}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={13}>13</MenuItem>
                                    <MenuItem value={21}>21</MenuItem>
                                </Select>
                            </Tooltip>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <FormControl fullWidth sx={{ m: 1}} variant="outlined">
                            <Tooltip title="Describa el proceso" placement="top">
                            <TextField
                                label="Proposito"
                                multiline
                                rows={3}
                                value={desc}
                                onChange={onChangeProp("desc")}
                            />
                            </Tooltip>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth sx={{ m: 1}} variant="outlined">
                            <Tooltip title="Que tipo de acciones deben impedirse" placement="top">
                            <TextField
                                label="Restricciones"
                                multiline
                                rows={3}
                                value={restrictions}
                                onChange={onChangeProp("restrictions")}
                            />
                            </Tooltip>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth sx={{ m: 1}} variant="outlined">
                            <Tooltip title="Que cosas deben pasar para que se acepte esta historia" placement="top">
                            <TextField
                                label="Criterios de aceptación"
                                multiline
                                rows={3}
                                value={criteria}
                                onChange={onChangeProp("criteria")}
                            />
                            </Tooltip>
                        </FormControl>
                    </Grid>
                </Grid>
                
                
                
            </Drawer>
        </div>
    );
}
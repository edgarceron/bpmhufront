import { Button, FormControl, Stack, TextField, Box, Fab } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { views } from 'views';
import { 
    changeCurrentView,
    setBackdropOpen,
    enqueueSnackbar as enqueueSnackbarAction
} from 'features/frame/mainFrameSlice';
import { createEqueue, errorHandleDefault, errorHandleForm } from 'utils';
import { selectFormData, selectId, setFormData, setId } from "./projectFormSlice"
import { addProject, getProject, replaceProject } from "./projectsServices";
import { changeTittle } from "features/header/headerSlice";



export const ProjectsForm = () => {
    const id  = useSelector(selectId);
    const formData = useSelector(selectFormData);
    const dispatch = useDispatch();
    const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
    const title = id ? 'Editar proyecto' : 'Crear proyecto';

    const handleChange = (prop) => (event) => {
        dispatch(setFormData({
            ...formData,
            [prop]: {
                ...formData[prop],
                value: event.target.value
            }
        }))
    };

    const getProjectData = (id) => {
        if (id !== undefined) {
            dispatch(setBackdropOpen(true))
            return async (dispatch) => {
                await getProject(id)
                .then((result) => {
                    const data = {
                        name: {value: result.data.data.name, error: false, helperText: ""},
                        desc: {value: result.data.data.desc, error: false, helperText: ""}
                    }
                    dispatch(setFormData(data));
                })
                .catch((error) => {
                    if (!error.response) console.log(error);
                    else (errorHandleDefault(error.response, enqueueSnackbar));
                })
                .finally(() => {
                    dispatch(setBackdropOpen(false))
                })
            }
        }
    }

    const formatForm = () => {
        return {
            name: formData.name.value,
            desc: formData.desc.value
        }
    }

    const updatedFormData = (data) => {
        return {
            name: {
                error: false, helperText: "",
                value: data.name
            },
            desc: {
                error: false, helperText: "",
                value: data.desc
            },
        }
    }

    const fabStyle = {
        position: 'absolute',
        right: 50,
        bottom: 160
    }

    const handleClickReturn = () => {
        dispatch(setId(undefined));
        dispatch(changeCurrentView(views.PROJECTS));
    }

    const createProject = () => {
        dispatch(setBackdropOpen(true));
        return async (dispatch) => {
            const data = formatForm()
            await addProject(data)
            .then((result) => {
                console.log(result);
                enqueueSnackbar(createEqueue(`Proyecto creado correctamente`, 'success'));
                dispatch(setFormData(updatedFormData(data))),
                dispatch(setId(result.data.id))
            })
            .catch((error) => {
                if (error.response){
                    if (errorHandleDefault(error.response, enqueueSnackbar)) return;
                    else dispatch(setFormData(errorHandleForm(error.response, enqueueSnackbar, formData)));
                }
                else console.log(error);
                dispatch(setBackdropOpen(false));
            })
            .finally(() => {
                dispatch(setBackdropOpen(false))
            })
        }
    }

    const updateProject = () => {
        dispatch(setBackdropOpen(true));
        return async (dispatch) => {
            const data = formatForm()
            await replaceProject(data, id)
            .then((result) => {
                console.log(result);
                enqueueSnackbar(createEqueue(`Proyecto altualizado correctamente`, 'success'));
                dispatch(setFormData(updatedFormData(data)));
                dispatch(setId(result.data.id));
            })
            .catch((error) => {
                if (error.response){
                    if (errorHandleDefault(error.response, enqueueSnackbar)) return;
                    else dispatch(setFormData(errorHandleForm(error.response, enqueueSnackbar, formData)));
                }
                else console.log(error);
                dispatch(setBackdropOpen(false));
            })
            .finally(() => {
                dispatch(setBackdropOpen(false))
            })
        }
    }

    const handleClick = () => {
        id ? dispatch(updateProject()) : dispatch(createProject());
    }
    
    useEffect( () => {
        console.log(id);
        if (id !== undefined) {
            dispatch(changeTittle(title))
            dispatch(getProjectData(id));
        } 
    }, [id]);

    return (
    <Box sx={{ justifyContent: 'center'}} >
        <Box sx={{ mt: 2, maxWidth: 'sm', ml: 'auto', mr: 'auto'}} >
            <Stack>
                <FormControl sx={{ m: 1 }} variant="outlined">
                    <TextField
                        id="outlined-adornment-name"
                        type={'text'}
                        value={formData.name.value}
                        error={formData.name.error}
                        helperText={formData.name.helperText}
                        onChange={handleChange('name')}
                        label="Nombre"
                    />
                </FormControl>

                <FormControl sx={{ m: 1 }} variant="outlined">
                    <TextField
                        id="outlined-adornment-desc"
                        type={'text'}
                        value={formData.desc.value}
                        error={formData.desc.error}
                        helperText={formData.desc.helperText}
                        onChange={handleChange('desc')}
                        label="Descripcion"
                    />
                </FormControl>
            </Stack>
            <Stack spacing={2}>
                <FormControl sx={{ m: 1 }} variant="outlined">
                    <Button variant="contained" onClick={handleClick}>{id ? 'Actualizar' : 'Crear'}</Button>
                </FormControl>
            </Stack>
        </Box>
        <Fab variant="extended" sx={fabStyle} aria-label={'Guardar'} color={'secondary'} onClick={handleClickReturn}>
            <ArrowBackIcon />
            Volver
        </Fab>
    </Box>
    )
}
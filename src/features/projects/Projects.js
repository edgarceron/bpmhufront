import React from 'react';
import Grid  from '@mui/material/Grid';
import { views } from 'views';
import EnhancedTable from 'features/table/Table';
import {setHeaders, setApiName, setSelected} from '../table/tableSlice';
import { useDispatch } from 'react-redux';
import { AccountTree, Edit } from '@mui/icons-material';
import { changeCurrentView } from 'features/frame/mainFrameSlice';
import { setId } from './projectFormSlice';
import { changeProject } from 'features/diagrams/diagramsSlice';

export function Projects(props) {
    const dispatch = useDispatch();
    const MODULE_NAME = "projects";
    const HEADERS = [
        {
            id: 'id',
            numeric: false,
            disablePadding: true,
            label: 'Código',
            filterable: true,
            filter_details: {
                type: "Text", //Text, Range, Picker
                options: {
                    "data_type": "number" //Min, Max range, picker_list, data_type (number, text, date)
                },
                value: '',
                value2: ''
            }
        },
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Nombre',
            filterable: true,
            filter_details: {
                type: "Text", 
                options: {
                    "data_type": "text"
                },
                value: '',
                value2: ''
            }
        },
        {
            id: 'desc',
            numeric: false,
            disablePadding: false,
            label: 'Descripción',
            filterable: true,
            filter_details: {
                type: "Text", 
                options: {
                    "data_type": "text"
                },
                value: '',
                value2: ''
            }
        },
        {
            id: 'creation_date',
            numeric: false,
            disablePadding: false,
            label: 'Fecha de creación',
            filterable: true,
            filter_details: {
                type: "Range", 
                options: {
                    "data_type": "date"
                },
                value: '',
                value2: ''
            }
        },
    ];
    const handleClickEdit = (event, name) => {
        console.log(name);
        dispatch(changeCurrentView(views.PROJECTS_FORM));
        dispatch(setId(name));
    };
  
    const handleClickBpmn = (event, name) => {
        console.log(name);
        dispatch(changeProject(name));
        dispatch(changeCurrentView(views.DIAGRAMS));
    };

    const actions = [
        {  
            'icon': Edit,
            'action': handleClickEdit
        },
        {  
            'icon': AccountTree,
            'action': handleClickBpmn
        },
    ]

    React.useEffect(() => {
        dispatch(setApiName(MODULE_NAME));
        dispatch(setHeaders(HEADERS));
        dispatch(setSelected([]));
    }, []);
    
    return (
        <Grid container>
            <Grid item xs={12} sx={{ my: 2 }}>
                <EnhancedTable tittle="Proyectos" addView={views.PROJECTS_FORM} actions={actions} />
            </Grid>
        </Grid>
    )
}
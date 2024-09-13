import { AddJobScreen } from "../screens";

export const CONST = {
    listScreen:{
        new_job: 'New Job',
        no_jobs: 'No jobs yet. Please add a new job'
    },
    AddJobScreen:{
        cameraPermissionAlert:{
            title: 'Cool Photo App Camera Permission',
            message: 'Cool Photo App needs access to your camera ',
            askMeLater: 'Ask Me Later',
            ok: 'OK',
            cancel: 'Cancel',
        },
        backAlert:{
            message:'Upload all images otherwise your job will not be added'
        }
    },
    AddJobPlaceholderArray:[
        {
            key: 'slot_1',
            title: 'Slot 1'
        },
        {
            key: 'slot_2',
            title: 'Slot 2'
        },
        {
            key: 'slot_3',
            title: 'Slot 3'
        },
    ],
    defaultImageURL: 'https://png.pngtree.com/png-vector/20230315/ourmid/pngtree-free-demo-tag-clipart-vector-png-image_6648845.png'
};
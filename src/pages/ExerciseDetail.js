import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';
import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';

const ExerciseDetail = () => {
    const [exerciseDetail, setExerciseDetail] = useState({});
    const [exerciseVideos, setExerciseVideos] = useState([]);
    const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
    const [equipmentExercises, setEquipmentExercises] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const fetchExercisesData = async () => {
            const exerciseDbUrl = process.env.REACT_APP_EXERCISE_API_BASE_URL;
            const youtubeSearchUrl = process.env.REACT_APP_YOUTUBE_EXERCISE_API_BASE_URL;

            const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercise/${id}`, exerciseOptions);
            setExerciseDetail(exerciseDetailData);

            const exerciseVideosData = await fetchData(
                `${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
                youtubeOptions,
            );
            setExerciseVideos(exerciseVideosData.contents);

            const targetMuscleExercisesData = await fetchData(
                `${exerciseDbUrl}/target/${exerciseDetailData.target}`,
                exerciseOptions,
            );
            setTargetMuscleExercises(targetMuscleExercisesData);

            const equipmentExercisesData = await fetchData(
                `${exerciseDbUrl}/equipment/${exerciseDetailData.equipment}`,
                exerciseOptions,
            );
            setEquipmentExercises(equipmentExercisesData);
        };

        fetchExercisesData();
    }, [id]);

    if (!exerciseDetail) return <div>No Data</div>;

    return (
        <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
            <Detail exerciseDetail={exerciseDetail} />
            <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
            <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
        </Box>
    );
};

export default ExerciseDetail;

import classNames from 'classnames';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form } from '../form';
import FormButton from '../form-button';
import FormInput from '../form-input';
import { Rating } from '../rating';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { fetchCreateReview } from '../../storage/single-product/single-product-slice';


export function FormReview({ title = 'Отзыв о товаре', productId}) {

    const dispatch = useDispatch();
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onBlur" })
    // const [rating, setRating] = useState(5);

    const handleSubmitFormReview = (data) => {
        dispatch(fetchCreateReview({productId, data}));
        reset();
    }

    const textRegister = register('text', {
        required: {
            value: true,
            message: 'Обязательное поле'
        },

    })

    return (
        <>
            <h2>{title}</h2>
            <Controller
                render={({ field }) => (
                    <Rating currentRating={field.value} setCurrentRating={field.onChange} isEditable error={errors.rating} />
                )}
                name="rating"
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'Укажите рейтинг'
                    }
                }}
            />

            <Form handleFormSubmit={handleSubmit(handleSubmitFormReview)}>
                <FormInput
                    {...textRegister}
                    typeTag='textarea'
                    id='text'
                    placeholder='Напишите текст отзыва'
                />
                {errors?.text && <p className="errorMessage">{errors?.text?.message}</p>}

                <FormButton type='submit' color='primary'>Отправить отзыв</FormButton>

            </Form>
        </>
    );

}

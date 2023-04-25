import classNames from 'classnames';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form } from '../form';
import FormButton from '../form-button';
import FormInput from '../form-input';
import s from './styles.module.css';
import cn from 'classnames';
import { Rating } from '../rating';
import api from '../../utils/api';


export function FormReview({ title = 'Отзыв о товаре', idProduct, setProduct, onSubmit }) {


    const { register, control, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onBlur" })
    // const [rating, setRating] = useState(5);

    const handleSubmitFormReview = (data) => {
        api.setProductReveiwById(data, idProduct);
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

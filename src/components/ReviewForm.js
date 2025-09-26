import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ReviewForm = ({ showId, onReviewAdded, existingReview, onReviewUpdated }) => {
  const isEditing = !!existingReview;

  const validationSchema = Yup.object({
    rating: Yup.number()
      .required('Rating is required')
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating must be at most 5'),
    comment: Yup.string()
      .required('Comment is required')
      .min(10, 'Comment must be at least 10 characters')
      .max(500, 'Comment must be less than 500 characters'),
    user_name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
  });

  const initialValues = {
    rating: existingReview?.rating || '',
    comment: existingReview?.comment || '',
    user_name: existingReview?.user_name || ''
  };

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      const url = isEditing 
        ? `http://127.0.0.1:5000/api/reviews/${existingReview.id}`
        : 'http://127.0.0.1:5000/api/reviews/';
      
      const method = isEditing ? 'PATCH' : 'POST';
      const body = isEditing 
        ? values 
        : { ...values, show_id: parseInt(showId), user_id: 1 }; // Default user for now

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Failed to save review');
      
      const savedReview = await response.json();
      
      if (isEditing) {
        onReviewUpdated(savedReview);
      } else {
        onReviewAdded(savedReview);
        resetForm();
      }
      
      setStatus({ success: true });
    } catch (error) {
      setStatus({ error: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ marginBottom: '30px', background: '#f7fafc', padding: '25px', borderRadius: '10px' }}>
      <h3>{isEditing ? 'Edit Review' : 'Add Your Review'}</h3>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="user_name">Your Name</label>
              <Field
                type="text"
                id="user_name"
                name="user_name"
                placeholder="Enter your name"
              />
              <ErrorMessage name="user_name" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <Field as="select" id="rating" name="rating">
                <option value="">Select a rating</option>
                <option value="1">⭐ 1 - Poor</option>
                <option value="2">⭐⭐ 2 - Fair</option>
                <option value="3">⭐⭐⭐ 3 - Good</option>
                <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
                <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
              </Field>
              <ErrorMessage name="rating" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="comment">Your Review</label>
              <Field
                as="textarea"
                id="comment"
                name="comment"
                rows="4"
                placeholder="Share your thoughts about this show..."
              />
              <ErrorMessage name="comment" component="div" className="error-message" />
            </div>

            {status?.error && (
              <div className="error-message" style={{ marginBottom: '15px' }}>
                {status.error}
              </div>
            )}

            {status?.success && (
              <div style={{ color: '#38a169', marginBottom: '15px' }}>
                Review {isEditing ? 'updated' : 'added'} successfully!
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn"
            >
              {isSubmitting 
                ? (isEditing ? 'Updating...' : 'Adding...') 
                : (isEditing ? 'Update Review' : 'Add Review')
              }
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReviewForm;
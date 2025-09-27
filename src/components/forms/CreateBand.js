import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const CreateBand = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Band name is required')
      .min(2, 'Band name must be at least 2 characters'),
    genre: Yup.string()
      .required('Genre is required'),
    description: Yup.string()
      .required('Description is required')
      .min(10, 'Description must be at least 10 characters'),
    formed_year: Yup.number()
      .required('Formation year is required')
      .min(1900, 'Year must be after 1900')
      .max(new Date().getFullYear(), 'Year cannot be in the future')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      const response = await fetch('https://music-band-1.onrender.com/api/bands/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          genre: values.genre,
          description: values.description,
          formed_year: parseInt(values.formed_year)
        }),
      });

      const responseText = await response.text();
      console.log('Response status:', response.status);
      console.log('Response text:', responseText);
      
      if (!response.ok) {
        let errorMsg = 'Failed to create band';
        try {
          const errorData = JSON.parse(responseText);
          errorMsg = errorData.error || errorMsg;
        } catch {
          errorMsg = responseText || errorMsg;
        }
        throw new Error(errorMsg);
      }
      
      if (!responseText || responseText.trim() === '') {
        throw new Error('Server returned empty response');
      }
      
      let newBand;
      try {
        newBand = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(`Invalid JSON response: ${responseText}`);
      }
      
      setStatus({ success: `Band "${newBand.name}" created successfully!` });
      resetForm();
    } catch (error) {
      console.error('Create band error:', error);
      setStatus({ error: error.message || 'Network error - please try again' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Link to="/" className="back-link">← Back to Shows</Link>
      
      <div className="hero-section">
        <h1 className="hero-title">🎸 Create New Band</h1>
        <p className="hero-subtitle">Add a new band to our music platform</p>
      </div>

      <div className="show-card">
        <div className="show-card-content">
          <Formik
            initialValues={{
              name: '',
              genre: '',
              description: '',
              formed_year: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="name">Band Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter band name"
                  />
                  <ErrorMessage name="name" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="genre">Genre</label>
                  <Field as="select" id="genre" name="genre">
                    <option value="">Select a genre</option>
                    <option value="Rock">Rock</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Pop">Pop</option>
                    <option value="Hip Hop">Hip Hop</option>
                    <option value="Classical">Classical</option>
                    <option value="Country">Country</option>
                    <option value="Indie">Indie</option>
                  </Field>
                  <ErrorMessage name="genre" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="formed_year">Formation Year</label>
                  <Field
                    type="number"
                    id="formed_year"
                    name="formed_year"
                    placeholder="e.g., 2020"
                  />
                  <ErrorMessage name="formed_year" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows="4"
                    placeholder="Tell us about this band..."
                  />
                  <ErrorMessage name="description" component="div" className="error-message" />
                </div>

                {status?.error && (
                  <div className="error-message" style={{ marginBottom: '15px' }}>
                    {status.error}
                  </div>
                )}

                {status?.success && (
                  <div style={{ color: 'var(--success)', marginBottom: '15px', fontWeight: '600' }}>
                    {status.success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn"
                  style={{ width: '100%' }}
                >
                  {isSubmitting ? 'Creating Band...' : 'Create Band'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CreateBand;
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import apiWithFallback from '../../utils/apiWithFallback';

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
      const bandData = {
        name: values.name,
        genre: values.genre,
        description: values.description,
        formed_year: parseInt(values.formed_year)
      };
      
      const newBand = await apiWithFallback.createBand(bandData);
      
      setStatus({ success: `Band "${newBand.name}" created successfully!` });
      resetForm();
      
      // Redirect to bands page after 2 seconds
      setTimeout(() => {
        window.location.href = '/bands';
      }, 2000);
    } catch (error) {
      console.error('Create band error:', error);
      setStatus({ error: error.message || 'Failed to create band' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <Link to="/" className="inline-flex items-center space-x-2 text-white hover:text-blue-200 transition-colors mb-8">
        <span>←</span>
        <span>Back to Shows</span>
      </Link>
      
      <div className="text-center py-12 mb-8">
        <h1 className="text-5xl font-black text-white mb-4">
          <span className="text-6xl">🎸</span> Create New Band
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Add a new band to our music platform and share their story with the world
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="card p-8">
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
              <Form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Band Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter band name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="genre" className="block text-sm font-semibold text-gray-700 mb-2">
                    Genre
                  </label>
                  <Field as="select" id="genre" name="genre" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                    <option value="">Select a genre</option>
                    <option value="Rock">🎸 Rock</option>
                    <option value="Jazz">🎷 Jazz</option>
                    <option value="Electronic">🎧 Electronic</option>
                    <option value="Pop">🎵 Pop</option>
                    <option value="Hip Hop">🎤 Hip Hop</option>
                    <option value="Classical">🎼 Classical</option>
                    <option value="Country">🤠 Country</option>
                    <option value="Indie">🎤 Indie</option>
                  </Field>
                  <ErrorMessage name="genre" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="formed_year" className="block text-sm font-semibold text-gray-700 mb-2">
                    Formation Year
                  </label>
                  <Field
                    type="number"
                    id="formed_year"
                    name="formed_year"
                    placeholder="e.g., 2020"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <ErrorMessage name="formed_year" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows="4"
                    placeholder="Tell us about this band..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {status?.error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                    {status.error}
                  </div>
                )}

                {status?.success && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl font-semibold">
                    {status.success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Creating Band...</span>
                    </div>
                  ) : (
                    'Create Band'
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateBand;
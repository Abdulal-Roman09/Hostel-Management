import React, { useState } from "react"
import {
  Camera,
  Save,
  User,
  Mail,
  MapPin,
  Calendar,
  Globe,
  Lock,
  Bell,
} from "lucide-react"

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Software developer passionate about creating amazing user experiences.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    birthDate: "1990-01-15",
    profilePrivate: false,
    emailNotifications: true,
    pushNotifications: false,
  })

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log("Profile saved:", profile)
  }

  // Helper initials for avatar fallback
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-orange-900">Profile Settings</h1>
          <p className="text-gray-500">Manage your account settings and preferences</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Picture Section */}
        <div className="md:col-span-1 border rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 text-orange-800 mb-4 font-semibold">
            <User className="h-5 w-5 text-orange-600" />
            Profile Picture
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative h-32 w-32 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 text-4xl font-bold select-none">
              {/* Normally you'd show an <img /> here */}
              {initials}
            </div>
            <button
              type="button"
              className="flex items-center gap-2 border border-orange-200 text-orange-600 px-3 py-1 rounded hover:bg-orange-50 hover:text-orange-700 transition"
            >
              <Camera className="h-4 w-4" />
              Change Photo
            </button>
            <p className="text-sm text-gray-500 text-center">JPG, GIF or PNG. Max size of 2MB.</p>
          </div>
        </div>

        {/* Main Profile Information */}
        <div className="md:col-span-2 space-y-6">
          {/* Basic Information */}
          <section className="border rounded-lg shadow-sm p-4">
            <h2 className="text-orange-800 text-xl font-semibold mb-1">Basic Information</h2>
            <p className="text-gray-500 mb-4">Update your personal details</p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={profile.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  placeholder="Enter your username"
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell us about yourself"
                rows={4}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </section>

          {/* Contact Information */}
          <section className="border rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-2 text-orange-800 mb-4 font-semibold">
              <Mail className="h-5 w-5 text-orange-600" />
              Contact Information
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={profile.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Enter your location"
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  id="website"
                  type="url"
                  value={profile.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="Enter your website URL"
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
          </section>

          {/* Additional Settings */}
          <section className="border rounded-lg shadow-sm p-4 space-y-6">
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                id="birthDate"
                type="date"
                value={profile.birthDate}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <hr />

            {/* Privacy Settings */}
            <div>
              <div className="flex items-center gap-2 text-orange-800 mb-2 font-semibold">
                <Lock className="h-4 w-4 text-orange-600" />
                Privacy Settings
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Private Profile</p>
                  <p className="text-sm text-gray-500">
                    Make your profile visible only to connections
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={profile.profilePrivate}
                  onChange={(e) => handleInputChange("profilePrivate", e.target.checked)}
                  className="w-5 h-5 accent-orange-600"
                />
              </div>
            </div>

            <hr />

            {/* Notification Settings */}
            <div>
              <div className="flex items-center gap-2 text-orange-800 mb-2 font-semibold">
                <Bell className="h-4 w-4 text-orange-600" />
                Notification Preferences
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.emailNotifications}
                    onChange={(e) => handleInputChange("emailNotifications", e.target.checked)}
                    className="w-5 h-5 accent-orange-600"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.pushNotifications}
                    onChange={(e) => handleInputChange("pushNotifications", e.target.checked)}
                    className="w-5 h-5 accent-orange-600"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Profile Preview */}
      <section className="border rounded-lg shadow-sm p-4">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 text-2xl font-bold select-none">
            {initials}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-sm font-medium">
                @{profile.username}
              </span>
              {profile.profilePrivate && (
                <span className="border border-orange-200 text-orange-600 px-2 py-0.5 rounded text-sm font-medium">
                  Private
                </span>
              )}
            </div>
            <p className="text-gray-500">{profile.bio}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              {profile.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {profile.location}
                </div>
              )}
              {profile.website && (
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-orange-600 hover:text-orange-700"
                  >
                    {profile.website}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined {new Date(profile.birthDate).getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import React from "react";
import { Link, useLocation } from "react-router-dom";
import './breadcrumb.css';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Only add "Home" if you're not on the homepage (i.e., `/`)
  const homeCrumb = location.pathname !== "/" ? { label: "Home", path: "/" } : null;

  // Generate other breadcrumb parts based on the pathnames
  const crumbs = pathnames
    .map((path) => {
      if (/^[a-f\d]{24}$/i.test(path)) return null;

      return {
        label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " "),
        path: "/" + path, 
      };
    })
    .filter(Boolean); 

  // Add "Home" at the start of breadcrumbs only if it's not the root URL
  const finalCrumbs = homeCrumb ? [homeCrumb, ...crumbs] : crumbs;

  return (
    <div className="breadcrumb">
      {finalCrumbs.map((crumb, index) => (
        <span key={index}>
          {index > 0 && " > "}
          {index === 0 ? (
            <Link to={crumb.path}>{crumb.label}</Link> 
          ) : (
            <span>{crumb.label}</span> 
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;

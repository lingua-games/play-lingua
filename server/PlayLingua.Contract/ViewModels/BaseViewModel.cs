using System;
using System.Collections.Generic;
using System.Text;

namespace PlayLingua.Contract.ViewModels
{
    public class BaseViewModel
    {
        public int AddedBy { get; set; }
        public DateTime AddedDate { get; set; }
        public DateTime LastUpdateDate { get; set; }

    }
}
